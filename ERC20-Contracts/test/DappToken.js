var DappToken = artifacts.require('./DappToken.sol');

contract('DappToken', function (accounts) {
    it('sets initial token deployment', function () {
        return DappToken.deployed()
            .then(function (instance) {
                tokenInstance = instance;
                return tokenInstance.totalSupply();
            }).then(function (totalSupply) {
                assert.equal(totalSupply.toNumber(), 1000000, 'set the total Supply to 1000000');
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function (adminBalance) {
                assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to admin account');
                return tokenInstance.name();
            }).then(function (name) {
                assert.equal(name, 'DApp Token', 'has correct name');
                return tokenInstance.burn(20, {from: accounts[0]});
            }).then(function(receipt){
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function (balance) {
                assert.equal(balance.toNumber(), (1000000 - 20), 'Remaining Token balance');
                return tokenInstance.freeze(100, {from: accounts[0]});
            }).then(function(receipt){
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function(balance){
                assert.equal(balance.toNumber(), (1000000 - 20 - 100), 'Remaining Token balance after freezing');
                return tokenInstance.unfreeze(100, {from: accounts[0]});
            }).then(function(receipt){
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function(balance){
                assert.equal(balance.toNumber(), (1000000 - 20), 'Remaining Token balance after unfreezing');
                return tokenInstance.mint(20, accounts[0], {from: accounts[0]});
            }).then(function(receipt){
                return tokenInstance.balanceOf(accounts[0]);
            }).then(function(balance){
                assert.equal(balance.toNumber(), 1000000, 'Adding Token balance after minting');
            })
    });

    it('transfer token ownership', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 99999999999);
        }).then(assert.fail).catch(function (error) {
            assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 25, { from: accounts[0] });
        }).then(function (success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 25, { from: accounts[0] });
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be "Transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the token transfer from');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 25, 'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function (balance) {
            assert.equal(balance.toNumber(), 25, 'adds the amount to receiving account');
        })
    });

    it('approves token for delegated transfer', function () {
        return DappToken.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function (success) {
            assert.equal(success, true, 'returns true');
            return tokenInstance.approve(accounts[1], 100, {from: accounts[0]});
        }).then(function (receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'should be "Approval" event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
            assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance){
            assert.equal(allowance, 100, 'stores the allowance for delegated transfer');
        })
    });

    // it('handles delegated token transfer', function(){
    //     return DappToken.deployed().then(function(instance){
    //         tokenInstance = instance;
    //         fromAccount = accounts[2];
    //         toAccount = accounts[3];
    //         spendingAccount = accounts[4];
    //         return tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
    //     }).then(function(receipt){
    //         return tokenInstance.approve(spendingAccount, 10, {from: fromAccount});
    //     }).then(function(receipt) {
    //         return tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount});
    //     })
    //     .then(assert.fail).catch(function (err) {
    //        assert(err.message.indexOf('revert') >= 0, 'cannot transfer the value larger than balance');
    //        return tokenInstance.transferFrom(fromAccount, toAccount, 50, {from: spendingAccount});
    //     }).then(assert.fail).catch(function(error){
    //         console.log(JSON.stringify(error));
    //         assert(error.message.indexOf('revert') >= 0, 'cannot transfer the value larger than approved amount');
    //         return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {from: spendingAccount});
    //     }).then(function(success){
    //         assert.equal(success, true, 'Transfer does not take place');
    //         return tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
    //     }).then(function(receipt){
    //         assert.equal(receipt.logs.length, 1, 'triggers one event');
    //         assert.equal(receipt.logs[0].event, 'Transfer', 'should be "Transfer" event');
    //         assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
    //         assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
    //         assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount');
    //         return tokenInstance.balanceOf(fromAccount);
    //     }).then(function(balance){
    //         assert.equal(balance, 90, 'From balance is not correct, actual is ' + balance);
    //         return tokenInstance.balanceOf(toAccount);
    //     }).then(function(balance){
    //         assert.equal(balance, 10, 'To balance is not correct, actual is '+ balance);
    //         return tokenInstance.allowance(fromAccount, spendingAccount);
    //     }).then(function(allowance){
    //             assert.equal(allowance.toNumber(), 0, 'stores the allowance for delegated transfer');
    //     })

    // });

});