$(document).ready(function()
{}); //end of domReady()..

window.domReadyEventsBinder = function(){
	$(".open_icon_markwrapper").on("click touchstart", function(e)
			{
			  var thisAction = $(this).find("a.open_icon_mark");
			  if(thisAction.parents(".listing_row").length > 0)
			  {
			  	 //thisAction.parents(".listing_row").siblings(".listing_row").find('.main-div').hide(500); // hide All which already opened..
		     	 thisAction.parents(".listing_row").find('.main-div').toggle(500);
			  }
			  else
			  {
			  	 //thisAction.parents(".traveller_info_section").siblings(".traveller_info_section").find('.main-div').hide(500); // hide All which already opened..
		     	 thisAction.parents(".traveller_info_section").find('.main-div').toggle(500);
			  }
			  e.preventDefault();
			});
			
			// Click on Cancel button and Bg Cover to Close [ Modify Search ]
			$(".modify_button_row .btn-secondary, #mfs_bgcover").on("click", function(e)
			{
			   $("a.modify_search_toggle").trigger("click");
			   
			   if($(this).attr("id") != "mfs_bgcover") //  Apart Click on Bg cover overlay
			   {
				   	$("html,body").animate({scrollTop: 0}, 800);
				   	e.preventDefault();
			   }
			});
			
			
		$("a.main_div_closeicon").on("click touchstart", function(e)
			{
				 $(this).parent(".main-div").hide(500);
				  e.preventDefault();
			});

			$("a.rating_sectn").on("click", function(e)
			{
				if($(this).hasClass('active'))
				{
					$(this).removeClass("active");
				}
				else
				{
					$(this).addClass("active");
				}
			});
			
			// checkbox state settings..
			$("div.filter_subdivisions div.checkbox").on("click touchstart", function(e)
															  {
																	var $this = $(this);
																	var $cb = $this.find("input")[0];
																	$this.addClass("active");
																	//$this.find("input").trigger("click");
																	
																	$cb.checked = !$cb.checked;
																	
																	if($this.find("input").is(":checked"))
																		$this.addClass("active");
																	else
																		$this.removeClass("active");
																		
																	e.preventDefault();
															  });
			
			// Filter Panel behaviour
			$("a.sectors_info").on("click", function(e)
															  {
																  if($("div.modify_widget").is(":visible") == false)
																  {	
																   	if($("div.modify_top").is(":visible") == false)
																   	{

																	$("#mfs_bgcover").css({
																		"width": $(document).width() +"px",
																		"height": $(document).height() +"px",
																		"z-index":10
																	 }).show();  // BG Cover..

																  	   $("div.modify_search").removeClass("noneAll");
																  	   $("div.modify_widget").toggle();
																	   $(this).toggleClass("active");
																	   
																	   
																	   if($("div.modify_widget").is(":visible"))
																	   {
																		   $("div.modify_search").css("border",0);  // remove border after close..
																	   }
																	   
																	   $("#mfs_bgcover").unbind("click");
																	   $("#header_mobile").css({"position":"relative","z-index":110});
																	   $("div.modify_search").css({"width":"100%","position":"absolute","z-index":11});
																	}
																  }
																  
															  else // in Shown Condition...
															  {
																  $("#mfs_bgcover").hide();
																   $("div.modify_search").addClass("noneAll");
																   $("div.modify_search").css({"position":"static"});															   														  	$("div.modify_widget").toggle();
																   $(this).toggleClass("active");														  														  														}
															  });
			
			// trigger search [ city ] selector..
			$("div.trigger_search_mobile").on("click", function(e)
																{
																	
																	$("#content").css("display","none");
																	$("body").css("overflow","hidden");  // body scroll none..
																	$("#header_mobile").removeClass("hidden-lg hidden-md hidden-sm hidden-stb").hide();
																	$("div.search_selector").fadeIn("medium", function()
																													   {
																			var windowHeight = $(window).height();
																			var city_sel_height = $("div.city_sel_top").outerHeight() + 30;
																			var calculated_height = windowHeight - city_sel_height;
																			$("div.top_cities_scroll").css("height", calculated_height);
																														  
																													   });
																});
			
			$("ul.top_cities_list > li > a").on("click", function(e)
																{
																	$("body").css("overflow","inherit");
																	$("div.search_selector").fadeOut();
																	$("#content").css("display","block");
																	$("#header_mobile").addClass("hidden-lg hidden-md hidden-sm hidden-stb").show();
																});
			
			
			$("button.modify_close").on("click touchstart", function(e)
															  {
																  if($("div.modify_widget").is(":visible"))
																  {																					   
																	  $("div.modify_widget").hide();
																	  $(".sectors_info").removeClass("active");
																	  $("div.modify_top").find(".has_fade").css("opacity",1);															  														  }
																  
																   if($("div.modify_top").is(":visible") == false)
																   {
																	   $("div.modify_search").addClass("noneAll");
																   }
															  });
			
			$("#productPanelTrigger,.header_filter_handler").on("click touchstart", function(e)
															  {
																  	var $this = $(this);
																	var $clickedPos = $this.offset();
																  	var $filterPanel = $("#filters_panel");
																	
																	// alert($filterPanel.is(":visible"));
																	if($filterPanel.is(":visible") == true && $filterPanel.hasClass("hidden-sm hidden-stb hidden-xs") == false)
																	{
																		$filterPanel.show().addClass("hidden-sm hidden-stb hidden-xs").fadeOut(200);
																		return false;
																	} // hide If Already Opened...											
																	
																	if($filterPanel.is(":visible") == false && $filterPanel.hasClass("hidden-sm hidden-stb hidden-xs"))
																	{
																		$filterPanel.removeClass("hidden-sm hidden-stb hidden-xs").hide().css({
																												   "left":$clickedPos.left + $this.outerWidth() + 15,
																												   "top":$clickedPos.top - 35 // add 50 tip set height
																																	   }).fadeIn(200);
																																	   
																		
																		// For mobile Case...
																		if($this.hasClass("header_filter_handler") == true)
																		{
																			$filterPanel.removeClass("hidden-sm hidden-stb hidden-xs").hide().css({
																												   "left":$clickedPos.left - $filterPanel.outerWidth()																										 
																																	   }).fadeIn(200);
																		}
																	}
																	return false;
															  });
			
			
			
			// more.. Location load..
			$("div.more_link").on("click touchstart", function(e){
																	    $("div.filter_partone").hide();
															   			$("div.filter_parttwo").hide().removeClass("hidden-xs hidden-sm hidden-stb").show('slow');
															   });
			
			// operation perform on "Document" click..
			$(document).on("click", docClickHandler);
			
			//stopPropogation() operation 
			$("#filters_panel,#productPanelTrigger").on("click", function(e){ 
															stopPropogation(e);
													   });
			
			// Modify Search..
			$("a.modify_search_toggle").on("touchstart click", function(e){
																	var $this = $(this);
																	$("#mfs_bgcover").css({
																						  	"width": $(document).width() +"px",
																							"height": $(document).height() +"px",
																							"z-index":10
																						 }).show();  // BG Cover..
																	
																	$("div.modify_search").css({"width":"100%","position":"absolute","z-index":11}); // Widget expanded..
																	
																	$("div.modify_widget").slideToggle('fast', function(e){ 
																														  
																										if($("div.modify_widget").is(":visible"))
																														  {
																			 $("div.modify_top").css("border-radius","3px 3px 0 0").find(".has_fade").css("opacity",0.5);
																			 $this.html("- Modify <span class='hidden-stb hidden-sm'>Search</span>");
																														  }
																														  else
																														  {
																			$("#mfs_bgcover").hide();
																			$("div.modify_search").css({"position":"static"});	// Re-positioned element
																			
																			
																			  $("div.modify_top").css("border-radius","3px").find(".has_fade").css("opacity",1);
																			  $this.html("+ Modify <span class='hidden-stb hidden-sm'>Search</span>");
																														  }
																														  });
																	
																	
																	
																	return false;
													   });
			
			
			// window resize();
			$(window).on("resize", function(e)
											{
												if($("#mfs_bgcover").is(":visible"))
												{
													     $("#mfs_bgcover").css({
															"width": $(document).width() +"px",
															"height": $(document).height() +"px",
															"z-index":10
														 });
												}
											});
						
		   $('.listing_row').mouseover(function(){
		   var listing_row = $(this);
		    listing_row.addClass('for_grey');
		  });
		  $('.listing_row').mouseout(function(){
		   var listing_row = $(this);
		    listing_row.removeClass('for_grey');
		  });

						
			// List and Map view buttons...
			$(".tabs_data_info").hide();
			$(".listing_row").find(".tabs_data_info:first").show();
			$(".itinerary_fare_tab a").on("click touchstart", function(e){
																  
																  	var $this = $(this);
																	var gethref = $this.attr("href");
																	var findParent = $this.parents("div.listing_row");
																	
																	findParent.find(".itinerary_fare_tab a").not($this).removeClass("active");
																	$this.addClass("active");
																	
																	findParent.find(".tabs_data_info").not($("."+gethref)).hide();
																	$("."+gethref).show();
																																
																	e.preventDefault();
																  });		
			
			
			// Listing page [ Meal ] tooltip
			// Tooltips..
		                $('.meal_tooltip').tooltip();	
						
						
			// Custom scrollbar for Passanger list [ Review Page ]
			if($(".custom_scrollbar").length > 0)
			{
		        $(".custom_scrollbar").tinyscrollbar({ scrollInvert : true });	
			}
			
			// Benefits section tooltip..
			$("#view_benefits_loginLink").on("click", function(e)
												{
													var $this = $(this);
													$(".benefits_section").css({
																			   		"left":$this.position().left
																			   }).show();
													e.preventDefault();	
												});
			
			$("#close_benefits_tooltip").on("click", function(e)
												{
													var $this = $(this);
													$(".benefits_section").hide();
													e.preventDefault();	
												});
			
			$("#close_benefits_tooltip").on("click", function(e)
												{
													var $this = $(this);
													$(".benefits_section").hide();
													e.preventDefault();	
												});
				$("p.more_optiontxt").on("click", function(e)
														   {
															var $this = $(this);
															if($this.hasClass("active") == true)
															{
																$this.removeClass("active");
															}
															else
															{
		        												$this.addClass("active");
														    }												
															
															$this.prev(".more_flight_options").toggle(500);
		    												e.preventDefault();	
														});
				
};


$(function() {
	$( "#price_slider" ).slider({
            range: "min",
            min: 2500,
            max: 80000,
			value: 11000,
            slide: function( event, ui ) {
				$( "#max_price").text(ui.value);
				//$(this).parent().next("#pricetooltip").css("zIndex", 1000).css("left",(event.originalEvent.clientX - 70)).show();
            },
			change: function(){ //$(this).parent().next("#pricetooltip").hide(); 
			}
        });
		
		$( "#max_price").text($("#price_slider").slider("value"));
});




// Prevent propogation..
var stopPropogation = function(e)
{
		if (e.button == 0)
		{
			e.stopPropagation();
		}
}

var docClickHandler = function(e){ 
                                if (e.button == 0)
                                {
                                   if($("#filters_panel").is(":visible") == true && $("#filters_panel").hasClass("hidden-sm hidden-stb hidden-xs") == false)
                                   {
                                                                $("#filters_panel").addClass("hidden-sm hidden-stb hidden-xs").fadeOut(500);
                                   }
                                   
                                   if($(".sorting_options_list").is(":visible") == true)
                                   {
                                                                $(".sorting_options_list:visible").slideUp(300);
                                   }     
								   
								   $('.popover_trigger,.popover_trigger_airlineTT,.popover_trigger_FC').popover("hide");
                                }
}
