/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 $(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
         it('are defined', function() {
         	expect(allFeeds).toBeDefined();
         	expect(allFeeds.length).toBeGreaterThan(0);
         });
        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('not empty URL', function(){
         	for( source of allFeeds){                
         		expect(source.url.length).toBeGreaterThan(0);
         	}
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('not empty name', function(){
         	for( source of allFeeds){                
         		expect(source.name.length).toBeGreaterThan(0);
         	}
         });

     });




        /* Ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* Ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          describe('The menu',function(){

          	let element = document.getElementsByClassName("menu-hidden")[0];
          	let menu = document.getElementsByClassName("menu-icon-link")[0];

          	it('check if menu is hidden by default',function () {            
          		expect(element).toBeDefined();
          	});


          	it('check if menu is toggled when clicked',function(){
          		menu.click();          		
          		expect($(element).hasClass()).toBe(false);
          		menu.click();
          		expect($(element).hasClass('menu-hidden')).toBe(true);

          	});


          });

        /* Ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */


         describe('Initial Entries', function(){
         	beforeEach(function(done){
         		loadFeed(0, function(){
         			done();
         		});
         	});

         	it(' Async Check if loadFeed has Entries', function(done){
         		let child = document.querySelectorAll(".feed .entry");
         		expect(child).toBeDefined();
         		expect(child.length).toBeGreaterThan(0);
         		done();
         	});     

         });


        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         describe('New Feed Selection', function(){

         	let feedOne , feedTwo;         	

         	beforeEach(function(done){   

         		loadFeed(1, function(){
         			feedOne = document.querySelector(".entry-link");
         			 	 loadFeed(0,function(){
         			 	 	feedTwo = document.querySelector(".entry-link");
         			 	 	done();
         			 	 });
         			});     

         	});

         	it('Check if feed changes when another source is selected', function(done){            	         
         	    expect(feedOne).not.toBe(feedTwo);		      	   	
         		done();            		
         	   	   			
         	});

         });

     }());
