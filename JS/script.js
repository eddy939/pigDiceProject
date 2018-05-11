//business logic
function Bank (name,balance){
	this.name = name;
	this.balance = balance;
}
Bank.prototype.deposit = function(amount){
	return this.balance += amount;
};
Bank.prototype.withdraw = function(amount){
	return this.balance -= amount;
};


//userinterface logic

$(document).ready(function(){
	$("form#create-account").submit(function(event){
		event.preventDefault();
		var inputName = $("input#name").val();
		var initDeposit = parseInt($("input#initial-deposit").val());
		
		var account = new Bank(inputName,initDeposit);
		console.log(account.balance+","+account.name);
		 //deposit
		$("form#deposit").submit(function(event){		
			event.preventDefault();
			var amount = parseInt($("input#deposit-amount").val());
			console.log(amount);
			account.deposit(amount);
			console.log(account.balance);
			$("#balance").text(account.balance);
		});
		//withdrawal
		$("form#withdraw").submit(function(event){	
			event.preventDefault();
			var amount = parseInt($("input#withdraw-amount").val());
			account.withdraw(amount);
			console.log(account.balance);
			$("#balance").text(account.balance);
		});
	});
});