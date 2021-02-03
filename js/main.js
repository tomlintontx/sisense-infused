function initScript(){

	//	Save a copy of the original jQuery library, to avoid conflicts
	window.jq = $.noConflict();

	//  Define the script tag to add
    var tag = document.createElement('script');
    tag.src = mySisenseApp.settings.server + '/js/sisense.js';
    tag.id = 'sisense-script';
    tag.type = 'text/javascript';

    //  Add event handler for when the script loads
    tag.onload = connect;

    //  Add the tag to the web page
    document.getElementsByTagName('body')[0].appendChild(tag);
}

//	Step 2: Function to start a connection to sisense.js
function connect(){
	
	//	Attempt to connect to the Sisense server
	try {
		Sisense.connect(mySisenseApp.settings.server)
			.then(loadApplication);
	} catch (err){
		console.log("Error: Failed connecting to the Sisense server")
	}
}

//	Step 3: Function to load the dashboard/widgets
function loadApplication(app){

	//  Save a reference to the sisenseApp
	mySisenseApp.app = app;

	//  Create a dashboard to store any potential widgets
	var dash = new Dashboard();

	//	Set the Elasticube for this dashboard (needed for filters)
	dash.datasource = mySisenseApp.settings.elasticube;

	//	Save the dashboard to the application
	mySisenseApp.app.dashboards.add(dash);
	mySisenseApp.dashboard = dash;


	//	Find any widgets on our web page
	var widgets = $('div[widgetid]');

	//	Loop through this list, and start loading the widgets
	widgets.each(function(index, element){

		//	Get the ID for this widget
		var widgetId = $(element).attr('widgetid');
		
		
		//	Load the widget
		mySisenseApp.dashboard.widgets.load(widgetId).then(function(widget){
			loadWidget(widget, element)
		})
	})

}


//	Step 4: Function to load a specific widget
function loadWidget(widget, element){
	//	Find the container to render the widget into
	var widgetDiv = $(element);
	widget.container = widgetDiv;
	widget.refresh();

}


// //this is not used in this example, but it's how you would do custom filters from your app to sisense
// function setFilter(value) {
	
// 	var options = {
// 		save:true, 
// 		refresh:true, 
// 		unionIfSameDimensionAndSameType:false
// 	}

	
// 	filter = {
// 		disabled: false,
// 		jaql: {
// 			title: 'label_value', //label_value
// 			dim: '[Final Final Table.label_value]', //name of the table and field from the elasticube
// 			datatype: 'text', //datatype from sisense elasticube
// 		}
// 	};
	
// 	filter.jaql.filter = {
// 		members: value,
// 		multiSelection: true,
// 		explicit: true
// 	};


// 	if (filter){
// 		mySisenseApp.dashboard.$$model.filters.update(filter,options)
// 	} else {
// 		console.log("Error: Could not set filter, invalid type defined in the HTML")
// 	}


// }

// function clearFilters() {
	
// 	mySisenseApp.dashboard.$$model.filters.clear();
	
// 	mySisenseApp.dashboard.refresh();
	
// }



initScript();


