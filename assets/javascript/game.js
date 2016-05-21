$(document).ready(function () {
	var yourHealth;
	var yourMaxHealth;
	var yourAttack;
	var enemyHealth;
	var enemyMaxHealth;
	var enemyCounter;
	var chosenPokemonAtck;
	var enemyName;

	var pokemonArray = [

		{
			id: "bulbasaur",
			img: "assets/images/bulbasaur.png",
			health: 318,
			attack: 49,
			counterAttack: 49,
		},

		{
			id: "charmander",
			img: "assets/images/charmander.png",
			health: 309,
			attack: 52,
			counterAttack: 52,
		},

		{
			id: "squirtle",
			img: "assets/images/squirtle.png",
			health: 314,
			attack: 48,
			counterAttack: 48,
		},
		
		{
			id: "pikachu",
			img:"assets/images/pikachu.png",
			health: 320,
			attack: 55,
			counterAttack: 55,
		},

		{
			id: "meowth",
			img: "assets/images/meowth.png",
			health: 290,
			attack: 45,
			counterAttack: 45,
		},

		{
			id: "zubat",
			img: "assets/images/zubat.png",
			health: 245,
			attack: 45,
			counterAttack: 45,
		}
	];

	//adds the objects to the desired position on the screen
	function makePokemon() {
		for (var i=0; i<pokemonArray.length; i++) {
			var img = $('<img>').addClass('pokemon').attr({id:pokemonArray[i].id, src: pokemonArray[i].img, "data-health": pokemonArray[i].health,  "data-attack": pokemonArray[i].attack, "data-counterAttack": pokemonArray[i].counterAttack});
			var hlth = $('<div>').addClass('progress-bar progress-bar-success').attr({"role":'progressbar', "aria-valuenow": '40', "aria-valuemin": '0', "aria-valuemax": pokemonArray[i].health, "style": 'width: 100%'}).text(pokemonArray[i].health);
			var divHlth = $('<div>').addClass('progress').append(hlth);
			var p = $('<p>').text(pokemonArray[i].id);
			divHlth.addClass('healthBar hide');
			p.addClass('name').attr('id', pokemonArray[i].id);
			var charRow = $('<div>');
			charRow.addClass('col-md-2 select').append(img).append(p).append(divHlth);
			$('.charSelect').append(charRow);
			
		}
	}; 
	makePokemon();

	$('body').on('click', '.select', function() {
		$('.pick').addClass('hide');
		$(this).removeClass('select col-md-2').addClass('chosenPokemon');
		$(this).children('.pokemon').addClass('mirror');
		$(this).children('.name').detach().appendTo('.charStats');
		$(this).children('.healthBar').removeClass('hide').detach().appendTo('.charStats');
		$('.healthBar')/*.removeClass('hide')*/.css("width", "100px");
		$('.space').removeClass('hide');
		$('.enemies').removeClass('hide');
		$(this).siblings().removeClass('select').addClass('enemy').detach().appendTo('.enemies');
		$('.enemies').css({
	      "background-color": "#F8F7D9",
	      "border-radius": "50px",
	      "float": "right",
	      "margin-left": "20px",
	      "width": "630px"
	    });
		$(this).detach().appendTo('#yourCharacter');
		$('.charSelect').addClass('hide');
		yourHealth = parseInt($('.chosenPokemon').children('.pokemon').attr('data-health'));
		yourAttack = parseInt($('.chosenPokemon').children('.pokemon').attr('data-attack'));
		chosenPokemonAtck = yourAttack;
		console.log(yourHealth);
		console.log(yourAttack);
	});
	
	//Second click chooses your opponent. Adds attack button to the DOM.
	$('body').on('click', '.enemy', function() {
		//If the #yourEnemy div is empty, then clicking a pokemon in the enemies div class will add it to the arena
		//specifically the #yourEnemy div in the arena.
		if($.trim($("#yourEnemy").html())=='') {
			$('#attack').removeClass('hide');
			$(this).removeClass('enemy col-md-2').addClass('chosenEnemy');
			$(this).detach().appendTo('#yourEnemy');
			$(this).children('.name').detach().appendTo('.enemyStats').css('float', 'right');
			$(this).children('.healthBar').removeClass('hide').detach().appendTo('.enemyStats').css({'float': 'right', 'clear': 'both'});
			enemyHealth = parseInt($('.chosenEnemy').children('.pokemon').attr('data-health'));
			enemyCounter = parseInt($('.chosenEnemy').children('.pokemon').attr('data-counterAttack'));
			nemesisAtck = enemyCounter;
			enemyName = $('.chosenEnemy').children('.pokemon').attr('id');
		}
	});

	//Attack button stuff. Only executes of there's a pokemon there.
	$('body').on('click', '#attack', function() {
		if(yourHealth > 0 && $.trim($("#yourEnemy").html()) !='') {
			enemyMaxHealth = parseInt($('.enemyStats').find('.progress-bar').attr('aria-valuemax'));
			enemyHealth = parseInt(enemyHealth) - parseInt(chosenPokemonAtck);
			yourMaxHealth = parseInt($('.charStats').find('.progress-bar').attr('aria-valuemax'));
			yourHealth = parseInt(yourHealth) - parseInt(enemyCounter);
			$('.charStats').removeClass('hide');
			$('.enemyStats').removeClass('hide');
			$('.charStats').find('.progress-bar').text(yourHealth);
			//Animates the healthBar.
			$('.charStats').find('.progress-bar').css('width', yourHealth/yourMaxHealth*100 /*+ '%'*/);
			$('.enemyStats').find('.progress-bar').css('width', enemyHealth/enemyMaxHealth*100 + '%');
			$('.enemyStats').find('.progress-bar').text(enemyHealth);
			$('.chosenPokemon img').effect('pulsate');
			$('.chosenEnemy img').effect('bounce');
			nemesisAtck -= parseInt(enemyCounter);
	
			
			if(yourHealth/yourMaxHealth*100 < 50) {
				$('.charStats').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(yourHealth/yourMaxHealth*100 < 20) {
				$('.charStats').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}
			if(enemyHealth/enemyMaxHealth*100 < 50) {
				$('.enemyStats').find('.progress-bar').removeClass('progress-bar-success').addClass('progress-bar-warning');
			}
			if(enemyHealth/enemyMaxHealth*100 < 20) {
				$('.enemyStats').find('.progress-bar').removeClass('progress-bar-warning').addClass('progress-bar-danger');
			}

			//Increases your health and your attack power if you defeat an enemy.
			if(enemyHealth <= 0) {
				enemyHealth = 0;
				//$('.enemyStats').find('.progress-bar').text(enemyHealth);
				$('.enemyStats').empty();
				$('#yourEnemy').empty();
				yourHealth += /*parseInt(yourHealth) + */parseInt(yourHealth)*1.5;
				chosenPokemonAtck += parseInt(yourAttack)*1.05;
			}

			//Executes if yourHealth equals 0, lets you know if you lost.
			if(yourHealth <= 0) {
				yourHealth = 0;
				$('.charStats').find('.progress-bar').text(yourHealth);
				$('.charStats').empty();
				alert('You Lose');
				$('.enemies').addClass('hide');
				$('.reset').removeClass('hide');
			}
		}
		//executes if the .enemy class is no more.
		if($.trim($(".enemy").html())=='' && $.trim($("#yourEnemy").html()) =='' && $.trim($(".chosenPokemon").html()) != '') {
			alert('You Win');
			$('.enemies').addClass('hide');
			$('.reset').removeClass('hide');
		}
	});

	//There's a bug in this reset button, will revisit it in v1.0.2
	$('body').on('click', '.reset', function() {
		$('#yourCharacter').empty();	
		$('#yourEnemy').empty();
		$('.enemies').empty();
		$('.charSelect').removeClass('hide');
		$('.pick').removeClass('hide');
		$('#attack').addClass('hide');
		$('.charStats').addClass('hide');
		$('.enemyStats').addClass('hide');
		$('.chosenPokemon').addClass('hide');
		$('.enemies').addClass('hide');
		$('.yourEnemy').addClass('hide');
		$('.reset').addClass('hide');
		makePokemon();
	});
	
});