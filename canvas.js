window.onload = function ()
{
	var canvas = document.getElementById('mon_canvas')
	var context = canvas.getContext('2d');
	if (!canvas || !context)
		alert("Erreur");
	
	var DIRECTION = {
		"BAS" : 0,
		"GAUCHE" : 1,
		"DROITE" : 2,
		"HAUT" : 3}
	
	function Snake()
	{
		this.x = 200;
		this.y = 200;
		this.dir = 2;
		this.size = 4;
		this.pos = 20;
		
		this.image = new Image();
		this.image.refSnake = this;
		this.image.src = "Snake.png";
	}
	
	function Item(save)
	{
		var pos_x = Math.floor((Math.random() * 49) + 1) * 10;
		var pos_y = Math.floor((Math.random() * 49) + 1) * 10;
		
		for (var count = 0; count < save.length; count += 2)
		{
			if (save[count] == pos_x && save[count + 1] == pos_y)
			{
				var pos_x = Math.floor((Math.random() * 49) + 1) * 10;
				var pos_y = Math.floor((Math.random() * 49) + 1) * 10;
				count = 0;
			}
		}
		this.x = pos_x;
		this.y = pos_y;
		
		
		this.image = new Image();
		this.image.src = "de.png";
	}
	
	function Dir(key, test)
	{
		if ((key == 38 || key == 87) && test.dir != 3)
		{
			test.dir = 0;
			test.pos = 0;
		}	
		else if ((key == 37 || key == 65) && test.dir != 2)
		{
			test.dir = 1;
			test.pos = 30;
		}
		else if ((key == 39 || key == 68) && test.dir != 1)
		{
			test.dir = 2;
			test.pos = 20;
		}
		else if ((key == 40 || key == 83) && test.dir != 0)
		{
			test.dir = 3;
			test.pos = 10;
		}
		return test;
	}

	var test = new Snake();
	var eat = 0;
	var x = 0;
	var y = 0;
	var img = new Image();
	var dir = 0;
	var obj = 0;
	var save = new Array();
	
	var my_Var = setInterval(function(){
		if (save.length < test.size * 2)
			save.push(test.x, test.y);
		if (obj == 0)
		{
			var item = new Item(save);
			img = item.image;
			x = item.x;
			y = item.y;
			obj = 1;
			console.log(x);
			console.log(y);
		}
		context.drawImage(img, x, y);
		if (test.x == x && test.y == y)
		{
			context.clearRect(test.x, test.y, 10, 10);
			context.drawImage(test.image, 0, test.pos, 10, 10, test.x, test.y, 10 ,10);
			obj = 0;
			var taille = save.length;
			taille++;
			save[taille] = x;
			taille++;
			save[taille] = y;
			test.size += 2;
			console.log(save);
			eat++;
		}
		
		if (test.y < 0 || test.y >= 500 || test.x < 0 || test.x >= 500)
		{
			alert("Game Over");
			window.location.reload();
			clearInterval(my_Var);
		}
		
		for (var n = 0; n < test.size * 2; n +=2)
		{
			context.clearRect(save[0], save[1], 10, 10);	
			save[n] = save[n + 2];
			save[n + 1] = save[n + 3];
			save[test.size * 2] = test.x;
			save[test.size * 2 + 1] = test.y;
		}
		
		
		
		if(test.dir == 0)
			test.y -= 10;
		else if(test.dir == 1)
			test.x -= 10;
		else if(test.dir == 2)
			test.x += 10;
		else if(test.dir == 3)
			test.y += 10;
		
		for (var count = 0; count < save.length; count += 2)
		{
			if (save[count] == test.x && save[count + 1] == test.y)
			{
				alert("Game Over");
				window.location.reload();
				clearInterval(my_Var);
			}
		}
		
		context.drawImage(test.image, 0, test.pos, 10, 10, test.x, test.y, 10 ,10);
		
	}, 1000 / (10 + eat));
	
	window.onkeydown = function(){
			var e = event || window.event;
			var key = e.which || e.keyCode;
			test = Dir(key, test);
		};
}