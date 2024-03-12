const timeOption=document.getElementById('block-time_option');// Блок настройки времени.
const inputTimeTest=document.getElementById('input_time-test');// Поле с веденным временем.
const timeScroll=document.getElementById('block-time_time-scroll');// Счетчик времени.
const numberOfCorrectAnswers=document.getElementById('number_of_correct_answers');// Цифра правильных ответов.
const numberOfIncorrectAnswers=document.getElementById('number_of_incorrect_answers');// Цифра не правильных ответов.
const brand=document.getElementById('brand');// Блок с брендом.
const description=document.getElementById('description');// Блок с утвержением к полученному бренде.
const blockItog=document.getElementById('block-itog');// Блок с итогами.
const itogTbody=document.getElementById('itog-tbody');// tbody таблицы итогов.
const blockItogInfo=document.getElementById('block-itog_info');// Блок с дополнительной информацией.
const btnAnswerTrue=document.getElementById('btn_answer-true');// Кнопка ответа "Правильно".
const btnStart=document.getElementById('btn_start');// Кнопка "Старт".
const btnAnswerFalse=document.getElementById('btn_answer-false');// Кнопка ответа "Не правильно".

let copyArrProductSTM=[]// Клон массива arrProductSTM для удаления из него пунктов.
let resultTest=[];// Результат тестирования.
let counterOfCorrectAnswers=0;// Счетчиек правильных ответов.
let counterOfIncorrectAnswers=0;// Счетчиек не правильных ответов.
let counterAnswer=0// Счетчик отвеченых вопросов.
let stringBrand='';// Бренд.
let stringDescription='';// утвержением к полученному бренде.
let stringDescriptionForTheBrand='';// Утвержение о полученном бренде.

function selectionOfBrandsAndStatements(){
	if(copyArrProductSTM.length==0){
		return itog("Вопросы закончились!");
	}
	description.style.color="darkslateblue";// Возвращаем цвет случайного оприсания бренда.
	btnAnswerTrue.disabled=false;// Делаем кнопку "Правильно" Активной.
	btnAnswerFalse.disabled=false;// Делаем кнопку "Не правильно" Активной.
	indexBrandsAndStatement=Math.floor(0 + Math.random() * copyArrProductSTM.length);// Индекс из диапозона элементов copyArrProductSTM.
	indexStatement=Math.floor(0 + Math.random() * arrProductSTM.length);// Индекс из диапозона элементов arrProductSTM.
	indexRandomness=Math.floor(0 + Math.random() * 2);// Индекс случайного числа (предназначен для увеличения случайного выбора).

	stringBrand=copyArrProductSTM[indexBrandsAndStatement].brand;
	stringDescriptionForTheBrand=copyArrProductSTM[indexBrandsAndStatement].description;// Выводим описание к бренд.

	brand.innerText=stringBrand;// Выводим бренд.
	stringDescription=indexRandomness==0?arrProductSTM[indexStatement].description:stringDescriptionForTheBrand;// Выводим случайное оприсание бренда.
	description.innerHTML=stringDescription;
	copyArrProductSTM.splice(indexBrandsAndStatement,1);// Удаляем элемент из массив, что бы он не повтарялся.
}

function answerCollaborator(LogicalOperator){
	objAnswer={
		"brand":stringBrand,
		"real-description":stringDescriptionForTheBrand,
		"description":stringDescription,
		"answer-user":LogicalOperator
	};
	resultTest.push(objAnswer);
	console.log(objAnswer);
	counterAnswer++;// Прибавляем 1 в счетчик отвеченых вопросов.
	if((stringDescriptionForTheBrand==stringDescription)==LogicalOperator){
		description.style.color="green";
		counterOfCorrectAnswers++;// Прибавляем 1 в счетчик правильных ответов.
		numberOfCorrectAnswers.innerText=counterOfCorrectAnswers;
	}else{
		description.style.color="red";// Подкрашеваем, неправильный ответ.
		counterOfIncorrectAnswers++;// Прибавляем 1 в счетчик не правильных ответов.
		numberOfIncorrectAnswers.innerText=counterOfIncorrectAnswers;
	}
	btnAnswerTrue.disabled=true;// Делаем кнопку "Правильно" Неантиной.
	btnAnswerFalse.disabled=true;// Делаем кнопку "Не правильно" Неантиной.
}

function fillingOutTheTable(){
	for(indexElem in resultTest){
		num=Number(indexElem)+1;
		trAnswer=document.createElement('tr');
		resulttestAnswerCollaborator=resultTest[indexElem]["answer-user"]?"Правильно":"Не правильно";
		trAnswer.innerHTML='<td class="table-itog_num">'+num+'</td><td class="table-itog_brand">'+resultTest[indexElem].brand+'</td><td class="table-itog_description">'+resultTest[indexElem]["real-description"]+'</td><td class="table-itog_description">'+resultTest[indexElem].description+'</td><td class="table-itog_answer">'+resulttestAnswerCollaborator+'</td>';
		if((resultTest[indexElem]["real-description"]==resultTest[indexElem].description)==resultTest[indexElem]["answer-user"]){
			trAnswer.className=".itog_correct-answer";// Клас на стрку при правильном ответе.
		}else{
			trAnswer.className="itog_incorrect-answer";// Клас на стрку при не правильном ответе.
		}
		itogTbody.append(trAnswer);
	}
	blockItogInfo.innerHTML="<p>Правильных ответов: "+counterOfCorrectAnswers+"</p><p>Не правильных ответов: "+counterOfIncorrectAnswers+"</p><p>Вопросов отвечено: "+counterAnswer+"</p>";
	blockItog.style.display="block";// Показываем итоги.
}

function itog(typeEnd){
	clearInterval(intervalId);// Останавливаем таймер.
	brand.innerHTML=typeEnd+"<br>Для начала проверки нажмите старт.";
	numberOfCorrectAnswers.innerHTML=0;// Обнуляем результаты правильных ответов..
	numberOfIncorrectAnswers.innerHTML=0;// Обнуляем результаты не правильных ответов.
	btnStart.style.display="block";// Показываем кнопку "Старт".
	btnAnswerTrue.style.display="none";// Прячем кнопку "Правильно".
	btnAnswerFalse.style.display="none";// Прячем кнопку "Не правильно".
	description.style.display="none";// Прячем описание.
	timeOption.style.display="flex";// Показываем поле с веденным временем.
	timeScroll.style.display="none";// Прячем таймер.
	fillingOutTheTable();// Заполнение таблицы.
}

function timer(timeTest){
	timeScroll.style.display="block";// Показывем таймер.
	timeScroll.innerHTML=`${Math.trunc(timeTest/3600)} ч. ${Math.trunc(timeTest/60)} м. ${timeTest>59?timeTest%60:timeTest} сек.`;
	intervalId = setInterval(() => {
		timeTest-=1;
		if (timeTest>0){
			timeScroll.innerHTML=`${Math.trunc(timeTest/3600)} ч. ${Math.trunc(timeTest/60)} м. ${timeTest>59?timeTest%60:timeTest} сек.`;
		}else{
			clearInterval(intervalId);// Останавливаем таймер.
			itog("Время вышло!");
		}
	}, 1000);
}

btnStart.addEventListener("click", function(event){
	counterOfCorrectAnswers=0;// Обнуляем счетчик правильных ответов.
	counterOfIncorrectAnswers=0;// Обнуляем счетчик не правильных ответов.
	counterAnswer=0;// Обнуляем счетчик отвеченых вопросов.
	resultTest=[];// Очищаем результат тестирования.
	copyArrProductSTM=[...arrProductSTM];// Клонируем массив arrProductSTM для удаления из него пунктов.
	timeOption.style.display="none";// Прячем поле с веденным временем.
	blockItog.style.display="none";// Прячем итоги.
	itogTbody.innerHTML="";// Опустошаем таблицу с итогами.
	blockItogInfo.innerHTML="";// Опустошаем не табличную информацию.
	timer(inputTimeTest.value);// Запускаем таймер.
	btnStart.style.display="none";// Прячем кнопку "Старт".
	btnAnswerTrue.style.display="block";// Показываем кнопку "Правильно".
	btnAnswerFalse.style.display="block";// Показываем кнопку "Не правильно".
	description.style.display="block";// Показываем описание.
	selectionOfBrandsAndStatements();
});

btnAnswerTrue.addEventListener("click", function(event){
	answerCollaborator(true);
	selectionOfBrandsAndStatements();
});

btnAnswerFalse.addEventListener("click", function(event){
	answerCollaborator(false);
	selectionOfBrandsAndStatements();
});