
var aa = bb = cc = ee = ff = gg = hh = 0;

var q1 = document.getElementById("q1");
q1.style = 'position:absolute;top:50px;left:10px'
	ctx = q1.getContext('2d');

var x_pos_ship = 75; //позиия на мониторе
var y_pos_ship = 150;
var x_speed_ship = y_speed_ship = 2; //ускорение
var bot_close_point = 0;
var col1 = 255; // переменные для изменения цвета
var col2 = 225;
var addX = 0; //добавочный х указывает сколько пикселей пройдено на карте
var addY = 0;
var down_or_up = 0; //направление отрисовки карты
var down_or_up2 = 0; //
var down_or_up3 = 0;
var number8 = 8;
var number9 = 9; //
var number10 = 10; //

//создание карты
var map = [[0, 0]]
var down_map = [[-5, 400]];

map.length = 125;
down_map.length = 125;
for (i = 1; i < map.length; i++) { //создаем карту

	random = Math.round(Math.random() * 10);
	if (random == 0 || random == 2 || random == 4 || random == 6 || random == 8) {
		random *= -1;
	}
	map[i] = [10 * i, map[i - 1][1] + random]//создаем  карту
	down_map[i] = [10 * i, map[i - 1][1] + (Math.random() + 0.7) * 300]//создаем нижнюю карту
}
//начальная позиция бота
var x_pos_bot = addX_bot = map[50][0]
	var y_pos_bot = map[50][1] + 20;

function creat_lines() {
	q1.height = 600;
	q1.width = 1000;
	//рисуем фон
	//в зависимости от удлаения до бота меняется цвет

	col1 = 255 - Math.abs(Math.round((x_pos_ship - x_pos_bot) * 0.06));
	col2 = 225 - Math.abs(Math.round((x_pos_ship - x_pos_bot) * 0.06));
	ctx.fillStyle = "rgb(+" + col1 + "," + col2 + ",181)";
	ctx.fillRect(0, 0, 1000, 600);

	ctx.fillStyle = "black";
	ctx.moveTo(map[0][0], map[0][1])
	map.forEach(function (item) {

		if ((item[0] < addX - 100) || (item[0] > addX + 1100)) { //карта не отрисовывается слева и справа рабочего поля
			return
		};
		ctx.lineTo(item[0] - addX, item[1] + addY);
	})
	ctx.lineTo(1005, -5);
	ctx.lineTo(-5, -5);

	ctx.moveTo(down_map[0][0], down_map[0][1]) //отрисовываем низ карты
	down_map.forEach(function (item) {
		if ((item[0] < addX - 100) || (item[0] > addX + 1100)) { //карта не отрисовывается дальше корабля
			return;
		}
		ctx.lineTo(item[0] - addX, item[1] + addY);
	})

	ctx.lineTo(1005, 605);
	ctx.lineTo(-5, 605);

	ctx.save()
	ctx.translate(x_pos_bot, y_pos_bot + addY);
	
	ctx.lineWidth = 1;

	if (x_pos_ship>x_pos_bot)  {
		x_speed_ship = -5;
		y_speed_ship *= -1;
		
		bot_speed = 0;
}
	
	
	
	
	ctx.moveTo(-3.5, 10);
	ctx.lineTo(3.5, 10);
	ctx.moveTo(0, 10);
	ctx.lineTo(0, 0);
	 ctx.moveTo(-10, -10);
	ctx.lineTo(-5, -10);
	 ctx.moveTo(-7.5, -10);
	ctx.lineTo(0, 0);
	 ctx.moveTo(10, -10);
	ctx.lineTo(5, -10);
	 ctx.moveTo(7.5, -10);
	ctx.lineTo(0, 0);
	ctx.closePath();
	 

	
	
	
	ctx.restore()
	ctx.translate(x_pos_ship, y_pos_ship);
	ctx.lineCap = "round";
	ctx.lineWidth = 2;
	ctx.rotate(angle_rot); //поворачиваем и смещаем координаты что бы корабль двигался
	ctx.moveTo(-25, -48);
	ctx.lineTo(-8, -48);

	ctx.moveTo(-19.5, -48);
	ctx.lineTo(-14.5, 8);

	ctx.moveTo(-14.5, 8);
	ctx.lineTo(0, -37);
	ctx.moveTo(0, -37);
	ctx.lineTo(14.5, 8);
	ctx.moveTo(14.5, 8);
	ctx.lineTo(19.5, -48);

	ctx.moveTo(25, -48);
	ctx.lineTo(8, -48);
ctx.fill();
	ctx.stroke();

	


};
var bot_speed = 0;
function bot_move() {

	bot_close_point = Math.floor((x_pos_bot + addX + 10) / 10)
		x_pos_bot = addX_bot - addX; //положение на экране = пройденый ботом путь-пройденый кораблем путь
	//ускорение
	middle_position = y_pos_bot - (((map[bot_close_point][1] * 2) + down_map[bot_close_point][1]) / 3); //разница между текущим Y бота и средним координатам верхней и нижней текстурами
	pow_middle_position = Math.pow((middle_position), 3);
	bot_ship_move = pow_middle_position * 0.00001;
	y_pos_bot -= bot_ship_move;

	bot_speed -= Math.abs(middle_position) * 0.001
	bot_speed < 5 ? bot_speed += 0.1 : bot_speed;
	addX_bot += bot_speed;

}
function collision() {
	//постоянно высчитываем текущие координаты углов корабля
	//сравниваем их с координатами границ(проверка на предмет столкновения)
	// 1---4
	// .   . это наш корабль
	// .   .
	// 2---3
	ship_4xy = [[x_pos_ship + addX + 55.902 * Math.sin(angle_rot - 0.4472), y_pos_ship - 55.902 * Math.cos(angle_rot - 0.4472)],
		[x_pos_ship + addX + 26.926 * Math.sin(angle_rot - 1.93731547), y_pos_ship - 26.926 * Math.cos(angle_rot - 1.93731547)],
		[x_pos_ship + addX + 26.926 * Math.sin(angle_rot + 1.93731547), y_pos_ship - 26.926 * Math.cos(angle_rot + 1.93731547)],
		[x_pos_ship + addX + 55.902 * Math.sin(angle_rot + 0.4472), y_pos_ship - 55.902 * Math.cos(angle_rot + 0.4472)]]
	ship_4xy.forEach(function (item, i) {
		x = item[0];
		y = item[1];
		left_point = Math.floor(x / 10) // номер текушей секции

			x_length_to_left_point = x - map[left_point][0]// удаление x до левой точки секции
			y_differt_left_right_point = map[left_point][1] - map[left_point + 1][1]// разницу Y
			y_different_left_point = (y_differt_left_right_point / 10) * (x_length_to_left_point); //на сколько текущий Y границы больше/меньше левой точки
		current_y_of_border = map[left_point][1] + addY - y_different_left_point;

		// if (i==3)
		// {console.log(      left_point + ' - ' + bot_close_point				)}


		if (y <= current_y_of_border) { //ударяемся об верх границу
			
			x_speed_ship *= 0.1
			y_pos_ship += 20;
		}

		y_differt_left_right_point = down_map[left_point][1] - down_map[left_point + 1][1]// разницу Y
			y_different_left_point = (y_differt_left_right_point / 10) * (x_length_to_left_point); //на сколько текущий Y границы больше/меньше левой точки
		current_y_of_border = down_map[left_point][1] + addY - y_different_left_point;

		if (y >= current_y_of_border) { //ударяемся о н
			
			x_speed_ship *= 0.1;
			y_pos_ship -= 20;
		}

	});
}

function map_move() {

	if (y_pos_ship < 300) { //карта двигается по у
		addY += (100 / (y_pos_ship));
		y_pos_ship += (100 / (y_pos_ship));
	} else if (y_pos_ship > 420) { //карта двигается по у
		addY -= (y_pos_ship / 500);
		y_pos_ship -= (y_pos_ship / 500);
	}

	if (x_pos_ship > 1) { //карта двигается по х
		addX += (x_pos_ship / 80);

		x_pos_ship -= (x_pos_ship * 0.002);

	}
	//console.log(      addX + ' - ' +  x_pos_bot +       )
	map_length = map.length; //записываем значение в переменную, т.к. обращаемся нескольок раз
	if (map_length < 125 + ((x_pos_bot + addX / 10) - 9)) { //по мере продвижения по карте добавуялем в массив map элменеты

		if (down_or_up3 > 300) {
			number8 == 8 ? number8 = 6 : number8 = 8; // 1 - значение,которое уже есть в стравнении
			down_or_up3 = 0;
		}
		if (down_or_up > 100) {
			number9 == 9 ? number9 = 6 : number9 = 9;
			down_or_up = 0;
		}
		if (down_or_up2 > 50) {
			number10 == 10 ? number10 = 6 : number10 = 10;
			down_or_up2 = 0;
		}
		down_or_up++;
		down_or_up2++;
		down_or_up3++;
		random = Math.round(Math.random() * 10);
		if (random == 0 || random == 2 || random == 4 || random == 6 || random == number8 || random == number9 || random == number10) {
			random *= -1;
		}
		map[map_length] = [map[map_length - 1][0] + 10, map[map_length - 1][1] + random]
		down_map[map_length] = [map[map_length - 1][0] + 10, map[map_length - 1][1] + (Math.random() + 1) * (2.2 * (number8 + number9) * number10)]//создаем нижнюю карту

	}
}

setInterval(function () {
	//console.clear()

	collision()

	ship_move()
	map_move()

	bot_move()
	deceleration()
	creat_lines()
}, 20);
//
//
//
//
//
////
////
////
////
////
////
////
////
////
////
////
////
////
//


var angle_rot = 0;
var gaz = false;
var turn_right = false;
var turn_left = false;
var stop = false;
document.onkeyup = function (e) {
	if ((e.code == 'Space') && (gaz = true)) {
		gaz = false

	} else if ((e.code == 'ArrowRight') && (turn_right = true)) {
		turn_right = false;
	} else if ((e.code == 'ArrowLeft') && (turn_left = true)) {
		turn_left = false;
	} else if ((e.code == 'ArrowDown') && (stop = true)) {
		stop = false
	}
}

document.onkeydown = function (e) {

	if (e.code == 'Space') {
		gaz = true;
	} else if (e.code == 'KeyS') {
		for (i = 2; i < 25; i++) {
			if (map[left_point + i][1] < map[left_point + i + 1][1]) {
				map[left_point + i + 1][1] -= (1 / i) * 100
			};
			if (down_map[left_point + i][1] > down_map[left_point + i + 1][1]) {
				down_map[left_point + i + 1][1] += (1 / i) * 100
			};
		}
	} else if (e.code == 'ArrowRight') {
		turn_right = true

	} else if (e.code == 'ArrowLeft') {
		turn_left = true
	} else if (e.code == 'ArrowDown') {
		stop = true
	};

}

//изменнеие позиции
var angle_speed = 0;
function ship_move() {
	if (gaz == true) {
		x_speed_ship += 0.01 * angle_rot;
		y_speed_ship -= 0.05 * (1.6 - Math.abs(angle_rot)) // 1,6- такая конструкция для симетричного отсчета угла влево и вправо от вертикальности
	}
	if (turn_left == true) {
		angle_rot -= 0.005;
		angle_speed -= 0.0005;
	}
	if (turn_right == true) {
		angle_rot += 0.005;
		angle_speed += 0.0005;
	}
	if (stop) {
		x_speed_ship -= 0.005 * angle_rot;
		y_speed_ship += 0.025 * (1.6 - Math.abs(angle_rot))
	}
	x_pos_ship += x_speed_ship;
	y_pos_ship += y_speed_ship;
	angle_rot += angle_speed;
	angle_speed *= 0.97;

}

//замедление со временем
function deceleration() {
	if (y_speed_ship > 0) {
		y_speed_ship += (y_speed_ship * 0.01)
	}
	x_speed_ship *= 0.99;
	y_speed_ship = (y_speed_ship * 0.99 + 0.01);

	if (angle_rot > 1.9) {
		angle_rot = 1.9
	};
	if (angle_rot < -1.9) {
		angle_rot = -1.9
	};
}
