//НОД
var gdc=function(a, b) {
    while (a != b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }
    return a;
}
var doc=document;

$(doc).ready(function(){
var N=2;//изначальное количество дробей
var flag=false;
var calc=function()
{		
		var fract=[];//массив дробей
		var res='';//строка с результатом
		var denom=1;//знаменатель
	    var patternFract = /^[-+]{0,1}[0-9]+$/i;  //допустимы числа с одним знаком или без знака
		var patternSign = /^[-\/+*]{1}$/i;  //допустим знак
	
		for(var i=0;i<N;i++) //забираем данные из полей
		{
			//если одна из ячеек непустая и содержит неверное значения
				
				if(doc.getElementById("on"+i).value.search(patternFract) != 0 && doc.getElementById("on"+i).value //если одно из заполненных полей нерегулярно
				|| 
				doc.getElementById("under"+i).value.search(patternFract) != 0 &&  doc.getElementById("under"+i).value
				||
				doc.getElementById("sign"+i).value.search(patternSign) != 0 &&  doc.getElementById("sign"+i).value)
				{
					$("#error").fadeIn(); 
					$('#txt').html("Wrong values! */-+ is required for sign`s cell, in number`s cell you can type number, for example -8832,+33,843 ");
					flag=true;
					break; 
				}
				else
					if(doc.getElementById("under"+i).value && doc.getElementById("under"+i).value=='0')//если ноль в знаменателе
						{
							$("#error").fadeIn(); 
							$('#txt').html("Zero in the denominator!");
							flag=true;
							break; 
						}
					else
						if(doc.getElementById("on"+i).value=='0' && doc.getElementById("sign"+i).value=="/") //если попытка делить на ноль
							{
								$("#error").fadeIn(); 
								$('#txt').html("Zero in the denominator!");
								flag=true;
								break; 
							}
						else
							if(doc.getElementById("on"+i).value&&doc.getElementById("under"+i).value&&doc.getElementById("sign"+i).value)//если любая тройка ячеек заполнена
							{	flag=false;
								fract[i]=[];
								fract[i][0]=doc.getElementById("sign"+i).value;
								fract[i][1]=doc.getElementById("on"+i).value;
								fract[i][2]=doc.getElementById("under"+i).value;
								denom*=fract[i][2];//перемножаем знаменатели
								res+=fract[i][0]+"("+fract[i][1]+"/"+fract[i][2]+")"; //получаем строку с примером	
											
							}

		}
			
			if(!flag)
			{
				var numer=Math.round(eval(res)*denom);//числитель
				if(numer==0)
				doc.getElementById("result").innerHTML="<div id='nl'>0</div>";
				else
					if(numer)
					{
						
						var nod=gdc(Math.abs(numer),Math.abs(denom));//НОД
						if(numer<0 && denom<0)
						{
							numer=Math.abs(numer);
							denom=Math.abs(denom);
						}
						else
						doc.getElementById("result").innerHTML="<div id='on'>"+(numer/nod)+"</div><hr id='hr'><div id='under'>"+(denom/nod)+"</div>";
					}
				}
				else
				{
				doc.getElementById("result").innerHTML='';
				}
			
	}
	

	$(".first").on("keyup", function()
		{
			return calc();
		}
	);

	$("#add").on("click", function(){ //при нажатии на Add Fraction
	N++;
	$("#computing").append("<input type='text' id='sign"+(N-1)+"' class='sign new"+(N-1)+"'/><div class='fract'><input type='text' id='on"+(N-1)+"' class='new"+(N-1)+"'/><hr><input type='text' id='under"+(N-1)+"' class='new"+(N-1)+"'/></div>");
		
		$(".new"+(N-1)).on("keyup", function()
		{
			return calc();
		});
	});
	$('#exit').click(function () 
	{
	$("#error").fadeOut();
	});
	
});