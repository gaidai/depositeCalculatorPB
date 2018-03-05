$(document).ready(function(){
	$('.deposite-link').click(function(event) {
		 event.preventDefault();
		 $('.deposite-list').toggle(300);
	});
	$(".hr").css('display', 'block');

	$('.deposite-list > ul> li>div').click(function(e){ 
  		$('#choosed-deposite').text( $(this).text() );
  		$('.deposite-list').toggle(300);
  		depositeLabels($(this).attr('id'));
    });
	depositeLabels('hr00');
	rangeListener();
	$(function () {
	    $('[data-toggle="tooltip"]').tooltip();
	});

});

var arr = [
	{
		id: 'hr00',
		percents:[14,15,13],
		months:[3,6,12]
	},
	{
		id: 'hr01',
		percents:[8,7,6],
		months:[3,6,12]
	},
	{
		id: 'hr02',
		percents:[8,7,17,12], 
		months:[3,12,24,36] 
	},
	{
		id: 'hr05',
		percents:[8,9,10,10,11,25,31], 
		months:[3,6,12,18,24,36,48] 
	},
	{
		id: 'hr03',
		percents:[2,4,5,7],
		months:[3,9,12,11]
	},
	{
		id: 'hr04',
		percents:[8,7,9,17,12], 
		months:[3,12,18,24,36] 
	},
	{
		id: 'usd00',
		percents:[2.8,2.7,3.6],
		months:[3,6,24]
	},
	{
		id: 'usd01',
		percents:[2.8,2.7,3.6],
		months:[3,6,12]
	},
	{
		id: 'usd02',
		percents:[1.8,2.7,1.7,3.2], 
		months:[3,12,24,36] 
	},
	{
		id: 'usd05',
		percents:[2.8,2.9,2.15,2.1,2.1,2.5,3.1], 
		months:[3,6,12,18,24,36,48] 
	},
	{
		id: 'usd03',
		percents:[2,2.6,2.5,2.7],
		months:[3,9,12,11]
	},
	{
		id: 'usd04',
		percents:[2.8,2.7,2.9,2.7,3.5], 
		months:[3,12,18,24,36] 
	},
	{
		id: 'eu00',
		percents:[1.8,1.7,1.6],
		months:[3,6,24]
	},
	{
		id: 'eu01',
		percents:[1.8,1.7,1.6],
		months:[3,6,12]
	},
	{
		id: 'eu02',
		percents:[0.8,0.7,1.7,1.2], 
		months:[3,12,24,36] 
	},
	{
		id: 'eu05',
		percents:[1,1.5,1.6,2,2.1,2.2,2.4], 
		months:[3,6,12,18,24,36,48] 
	},
	{
		id: 'eu03',
		percents:[2.5,2.4,2.5,2.7],
		months:[3,9,12,11]
	},
	{
		id: 'eu04',
		percents:[1,1.2,1.5,1.7,1.2], 
		months:[3,12,18,24,36] 
	}
];
var currency = "грн";
var percents ;
var months ;
var deposite;
var continueTimes = 0;
var depSum;
var depAdd;
var tax = false;
var capitalization = true;
function depositeLabels (depositeId) {		
	
	$('.percents , .months, .range-container' ).empty();	
	deposite = $.grep(arr, function(e){ return e.id === depositeId; })[0];
	
	var terms = deposite.percents.length;
	$('.range-container').append('<input class="r1 deposite-range" type="range" min="0" max="'+(terms-1)+'" value="'+(terms-1)+'" step="1" />');
	var width = $('.percents ').width();

	$('.percents').append('<div class="range-label ">'+ deposite.percents[0]+'%</div>'); 
	$('.months').append('<div class="range-label">'+deposite.months[0]+'</div>');
	for(var i = 1; i< terms-1; i++){
		$('.percents').append('<div class="range-label">'+ deposite.percents[i]+'%</div>'); 
		$('.months').append('<div class="range-label">'+deposite.months[i]+'</div>');
		$('.range-label').css({
			width: width/(terms-1)+'px'
		}); 
	};
	$('.percents').append('<div class="range-label">'+ deposite.percents[terms-1]+'%</div>'); 
	$('.months').append('<div class="range-label">'+deposite.months[terms-1]+'</div>');
	$('.percents div').first().css({
			width: width/(terms-1)/2+'px'
		});
	$('.months div').first().css({
			width: width/(terms-1)/2+'px'
		}); 
	$('.percents div').last().css({
			width: width/(terms-1)/2+'px'
		}); 
	$('.months div').last().css({
			width: width/(terms-1)/2+'px'
		}); 
	rangeListener();
	start();	
};
$(document).mouseup(function(e) {
    var container = $(".deposite-list");
    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0){
        container.hide();
    };
});
$('.currency').click(function(event) {
	item = $(this);
	$('.currency-active').removeClass('currency-active');
	item.addClass('currency-active');
	currency = item.attr("data-currency");
	$('.deposite-list > ul> li>div').css('display', 'none');
	$("."+(item.attr( 'id'))).css('display', 'block');
	$('#choosed-deposite').text( $( "#" + item.attr('id') + "00").text());
	depositeLabels(item.attr('id') + "00");
	rangeListener();
});

function rangeListener (){
	$('.r1').on('input', function(e){
		  var min = e.target.min,
		      max = e.target.max,
		      val = e.target.value;  
		  $(e.target).css({
		    'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
		  });
	}).trigger('input');
};

$('#sum-edit').on("input",function (e) {  
	var charCode = (e.which) ? e.which : e.keyCode;	
    if (charCode > 31 && (charCode < 48 || charCode > 57)){       		
    	return false;    	   
    };	
	var val = parseInt(e.target.value );
	if(isNaN(val)){
		val = 0;
	};	
	$('#sum-range').val(val);
	rangeListener();
	start();
}).trigger('#sum-range');

$('#add-edit').on(" input",function (e) {   

	var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    };		
	var val = parseInt(e.target.value );
	if(isNaN(val)){
		val = 0;
		$(this).val(0);
	};
	$('#add-range').val(val);
	rangeListener();
	start();
});
$('#sum-range').on('input click', function(e) {
  
	var sum = parseInt(e.target.value);
    $('#sum-edit').val(sum);
    var add = parseInt($('#add-range').val());
    if( sum < add ){
    	$('#add-range').attr('value',sum); 
    	addEdit();
    	$('#add-range').val(sum);    	
    	$( "#add-range" ).trigger( "input" );
    };
    start();
});
$('#sum-range').on('change', function(e) {
	var sum = 0;
	if (e.target.value !=0 || (parseInt(e.target.value/100))*100 != e.target.value){
		sum = (parseInt(e.target.value/100))*100 - 0;
		$(this).val(sum);
	};
    $('#sum-edit').val(sum);
    var add = parseInt($('#add-range').val());
    if( sum < add ){
    	$('#add-range').attr('value',sum); 
    	addEdit();
    	$('#add-range').val(sum);    	
    	$( "#add-range" ).trigger( "change" );    	
    };
    start();
});

var maxAdd= 50000;
$(document).on('input click', '#add-range', function(e) {

	var sum = $('#sum-edit').val();
	var add = parseInt(e.target.value);	
    // console.log('2 sum :' + sum + '+ add : ' + add + " " + e.target.value + " " + e.type+"  "+document.getElementById('add-range').value);
    if( sum < add ){  
		document.getElementById('add-range').value = sum;   
    	rangeListener();
    };
    addEdit();
});

$(document).on('change', '#add-range', function(e) {
	var add = 0;
	if(e.target.value != $('#sum-edit').val()){
		if (e.target.value !=0 || (parseInt(e.target.value/100))*100 != e.target.value){	
			add = (parseInt(e.target.value/100))*100 -0;	
			$(this).val(add);
		};
	};
	var sum = $('#sum-edit').val();
    if( sum < add ){  
		document.getElementById('add-range').value = sum;       
    };
    addEdit();
    rangeListener(); 
});

function addEdit(){
	
    var add = $('#add-range').val();
    $('#add-edit').val(add);
    start();
};

$(document).on('input change click', '#continue-range', function(e) {
	$('.continue-label div').text(e.target.value);	
	continueTimes = Number(e.target.value);
	start();
});
$(document).on('input change click', '.deposite-range', function(e) {
	var val = e.target.value;
	$('#edit-block span').first().text(deposite.percents[val]);
	$('#percents-edit').val(deposite.percents[val]);
	percents = deposite.percents[val];
	months = deposite.months[val];
	start();
});
$(document).on('click', '#percents-edit-icon', function(e) {
	$('#edit-block svg, #edit-block span ').hide();
	$('#percents-edit').show();
	$('#percents-edit').focus();

});

$(document).on('change focusout', '#percents-edit', function(e) {
	var val = e.target.value ;
	if( val[val.length -1] ==="0" && val[val.length -2] ==="." ){
		val = val.slice(0, -2);
	};
	if(val.length === 4 && val[0] === "." ){
		val= "0."+ val[1];
	};		
	while(val[val.length -1] ==="."){
		val = val.slice(0, -1);				
	};	
	if( val[val.length -3] ==="." ){
		val = val.slice(0, -1);
	};
	if( val[val.length -1] ==="0" && val[val.length -2] ==="." ){
		val = val.slice(0, -2);
	};	
	$('#edit-block span ').first().text(val);
	if(parseInt(val) >= 100 || isNaN(val)){
		$(this).addClass('wrong-input');
	}else{
		$('#percents-edit').hide();
		$('#edit-block svg, #edit-block span ').show();
		percents = $(this).val();
	};
	if (val ==="" || val ==="0." ||  val ==="0.0" || val ==="00.0" ||  val ==="0.00"){
		val=0;
	};
	if(!isNaN(val)){
		$(this).val(val);
		percents = val;
		start();
	};
	
});

$('#percents-edit').on('keypress', function(e) {
	var charCode = (e.which) ? e.which : e.keyCode;
	console.log(charCode);
	if (e.keyCode === 13) {
        $(this).trigger('focusout');
    }; 
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
    	if( charCode == 46 || charCode == 39 ||  charCode == 37){     	
    	}else{ 	return false;};  	
    };    
});
$('#percents-edit').on('input', function(e) {    
	if (e.target.value ==="."){
		$(this).val("0.");
	};
	if($(this).hasClass('wrong-input')){
    	$(this).removeClass('wrong-input');
    };
});
$('#capitalization-true').click(function() {
	$('#capitalization-false').removeClass('active').addClass('not-active');
	$(this).removeClass('not-active').addClass('active');
	capitalization = true;
	start();
});
$('#capitalization-false').click(function() {
	$('#capitalization-true').removeClass('active').addClass('not-active');
	$(this).removeClass('not-active').addClass('active');
	capitalization = false;
	start();
});
$('#tax-true').click(function() {
	$('#tax-false').removeClass('active').addClass('not-active');
	$(this).removeClass('not-active').addClass('active');
	tax = true;
	start();
});
$('#tax-false').click(function() {
	$('#tax-true').removeClass('active').addClass('not-active');
	$(this).removeClass('not-active').addClass('active');
	tax = false;
	start();
});

function start(){
	var months_calced = months * ( 1 + continueTimes );
	depSum = Number($('#sum-edit').val());
	depAdd = Number($('#add-edit').val());

	var invest = depSum + depAdd*months_calced;

	$('#sum-result').text(depSum + " (" + currency +")" );
	$('#add-result').text(depAdd*months_calced + " (" + currency +")");
    $("h3.invest ").text( invest);   
    $('#percents-result').text(percents + " % (на рік)");
    var sum = depSum;
    var total_percents = 0;
    var month_percents = 0;
    var percentsForMonths = function(){
    	// tax = 19.5%
    
		sum = sum + depAdd ;
		month_percents = sum*percents/100/12;
		if(tax){
			month_percents = month_percents*0.805;
    	};   	
    	if(capitalization){
    		sum += month_percents;
    	};
    	total_percents +=  month_percents ;
    };
    for(var i = 0; i <months_calced; i++){
    	percentsForMonths();
    }; 
    var allBackSum = parseInt(total_percents) + invest;
    var part = 70/allBackSum;
    $('#full-result').text(parseInt(total_percents) + " (" + currency +")");
    $('.result').text(allBackSum);
    $(".bar-percents").css('height',Number(total_percents*part + 10) + '%');
    $(".bar-add").css('height',Number(depAdd*months_calced*part + 10) + '%')
    	.attr('data-original-title', 'Щомісячне поповнення ' +depAdd+ ', Сума поповнень: ' + ' ' +depAdd*months_calced  );
    $(".bar-sum").css('height',Number(depSum*part + 10) +'%').attr('data-original-title', 'Сума вкладу '+depSum);
     
     $('.bar-percents').last().attr('data-original-title', 'Сума виплачених відсотків '+ parseInt(total_percents));

	

};
