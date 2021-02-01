//Get the button
var mybutton = document.getElementById("returnTop");
console.log('%cThank you for viewing my resume. This was mostly my work [I typed each line that appears here] and as a first project there are likely improvements that you, the experienced developer, have noted. I will gladly accept your suggestions.','color:red;font-size:15px');
console.log('%cI am also working on a few other projects: an advertising platform, a farming venture, and ... I will be linking those pages to this one as soon as they are ready','color: green;font-size:15px')
console.log('%cI am presently looking for employment','background-color:black;color:red;font-size:20px;border: solid green');
mybutton.style.display = "none";

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
  // Note that menuItems array must be placed in the order in which they appear on the page
  let menuItems = ["top","education","experience","abilities","awards","pubs","contact"]; 
  let highlightMenuItems = ["highlight_home","highlight_education","highlight_experience","highlight_abilities","highlight_awards","highlight_pubs","highlight_contact"]; 
  for (i = 0; i < menuItems.length-1; i++){
	let item = document.getElementById(menuItems[i])
	let nitem= document.getElementById(menuItems[i+1])
    if (document.body.scrollTop>= item.offsetTop+5 || document.documentElement.scrollTop+5 > item.offsetTop) {
	  document.getElementById(highlightMenuItems[i]).style.backgroundColor = "#aaa";
	} else {
		//console.log(item);
		document.getElementById(highlightMenuItems[i]).style.backgroundColor = "#bbb";
    }  
  }
}

// On clicking menu item, go to item
function scrollToContact(x) {
	var contactCard = document.getElementById(x);
	document.body.scrollTop = contactCard.offsetTop-5;
	document.documentElement.scrollTop = contactCard.offsetTop-5;
	//console.log('Selected '+x);
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log('Return to top');
}
// Send email without redirect
window.addEventListener("load", function(){
    function silentEmail(){
        let url = '/contactbright';
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;    
        const message = document.getElementById('message').value;
        
        let messagePacket = {
			'name':name, 
			'email':email, 
			'message':message
		};  
		  
        console.log('Check data');
        console.log(messagePacket);
        
        const XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function(){
			if (XHR.readyState ==4 && XHR.status ==200){
				console.log(XHR.responseText);
				alert("Message received; I'll respond ASAP.")
				formdata.reset();
			} else {
				console.log('Working');
				//alert("Something went wrong!")
			}
		}
        XHR.open("POST",url,true);
        XHR.setRequestHeader("Content-Type","application/json;charset=UTF-8");
        XHR.send(JSON.stringify(messagePacket));
    }
    
    const formdata = document.getElementById("contactbright");
    formdata.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log('I have taken over');
        silentEmail();
    });
});

