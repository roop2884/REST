function getMergedData()
{
	addLog('Script initialized');
	var jsonPersons = getJsonData();
}

function addLog(msg)
{
	var dt = new Date();
	var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
	
	$('#log').append(time + ' ' + msg+"<br>");
}

function getJsonData()
{
	addLog('Call Sent to JSON API');

	setTimeout(function(){ 
	$.ajax({
		method: "POST",
		url: "api.json",
		async:false,
		dataType:"JSON",
		data: { }
	})
	.done(function( data ) {
		addLog('Response received from JSON API');		
		var persons = [];
		$.each(data.person, function( index, value ) {
			persons.push(value);
		});

	// ajax call
	addLog('Call Sent to XML API');
	setTimeout(function(){ 
		$.ajax({
			method: "POST",
			url: "api.xml",
			async:false,
			dataType:"xml",
			data: { }
		})
		.done(function( data ) {
 		 addLog('Response received from XML API');		

 		 $(data).find("person").each(function()
		  {

		  	var id = ($(this).find("id").text());
		  	var firstname = ($(this).find("firstName").text());		  	
		  	var lastname = ($(this).find("lastName").text());		  			  	
		  	var obj = {"firstName":firstname, "lastName":lastname, "id":id};
		  	persons.push(obj);
		  });

 		 renderData(persons);

		});
	}, 10000);	


	});

	}, 5000);	
}


function renderData(persons)
{

	var sortedPersons = persons.sort(function (a, b) {
	  if (a.id > b.id) {
	    return 1;
	  }
	  if (a.id < b.id) {
	    return -1;
	  }
	  // a must be equal to b
	  return 0;
	});

	var html = '';
	$.each(sortedPersons, function( index, value ) {
		html += '<tr>\
		<td>'+value.id+'</td>\
		<td>'+value.firstName+'</td>\
		<td>'+value.lastName+'</td>\
		</tr>';
	});

	$('#table').html(html);
	addLog('Response Rendered successfully.');		

}
