//creates a variable that contains an array containing all sections
const allSections = Array.from(document.querySelectorAll("section"));
//a variable that has the id of the navigation bar unordered list
const navUl = document.getElementById("navbar__list");
//creates a document fragment to increase peformance
const fragment = document.createDocumentFragment();


//Creates navigation bar
function createNavbarList () {
    //loop over each section    
    for (const section of allSections) {
        //create list elements and anchors to store them inside the list elements.
        const listElement = document.createElement("li");
        const anchorLink = document.createElement("a");
        //adds corresponding navbar link name for each section, adds it's appropriate class & sets href.
        anchorLink.innerHTML = section.getAttribute("data-nav");
        anchorLink.setAttribute("href", "#" + section.id);
        anchorLink.classList.add("menu__link");
        
        //makes scrolling smooth when clicking the navigation bar
        anchorLink.addEventListener("click", evt=> {
            evt.preventDefault();
            section.scrollIntoView({behavior: "smooth", block: "center"})
        });
        //stores the anchor inside the appropriate list element & the list items to the document fragment
        listElement.appendChild(anchorLink);
        fragment.appendChild(listElement);
    }
    //appends the fragment we used to help peformance to the unordered list
    navUl.appendChild(fragment);
};
createNavbarList();


//adding an event listner to highlight the section visible on screen
window.addEventListener("scroll", ()=>{
    const options = {
        threshold:0.7,
    };

    const observer = new IntersectionObserver (callback, options);
    function callback (entries) {
        //looping over all the intries(sections) to check if they're visible on screen or not 
        entries.forEach(entry=>{
            let anchor = document.querySelector(`a[href="#${entry.target.id}"]`);
            //if they are visible we add the appropriate classes to the section and it's navigation bar link make them highlighted.
            if (entry.isIntersecting) {
                entry.target.classList.add("your-active-class");
                anchor.classList.add("activeBar")                 
            }
            //if they're not we remove the class from the rest of the sections & nav bar links to make them not highlighted.
            else {
                entry.target.classList.remove("your-active-class")
                anchor.classList.remove("activeBar")              
            }
        });
    };
    //executes the observer to observe each section
    allSections.forEach(section=>{
        observer.observe(section)
    })        
});


//making a variable that's linked to a button that scrolls to the top of the page
const toTopButton = document.querySelector("#btnToTop");

// Scroll to the top of the page when button is clicked.
function topFunction() {
    document.body.scrollTop = 0;
    };
 
// Hide the button when at top of page & otherwise display it.
function scrollFunction() {
   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = "block";
   } else {
    toTopButton.style.display = "none";
   }
 };
 window.onscroll = function() {scrollFunction()};
 

 //A button that collapses each section.
 var collapseButton = document.getElementsByClassName("collapsible");
 
 for (var i = 0; i < collapseButton.length; i++) {
   collapseButton[i].addEventListener("click", function() {
     this.classList.toggle("active");
     var content = this.nextElementSibling;
     if (content.style.display === "block") {
       content.style.display = "none";
     } else {
       content.style.display = "block";
     }
   });
 } 

