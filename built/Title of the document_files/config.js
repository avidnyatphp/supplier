var ConfigMixin = {
	utils : function(){
		var clientId = "";
		var auth_token = "";
		
		function url(){
		 var BASE_URL = "https://dev.thrillophilia.com/api/v1/";

         var ENV = "prod"; // for development it is "dev" , for production it is "prod"
         var devConfig = {
				"CREATE_ACCOUNT": BASE_URL+"suppliers/sign_up",
		        "LOGIN": BASE_URL+"suppliers/sign_in",
		        "SEND_RESET_PASSWORD_EMAIL": BASE_URL+"suppliers/password",
		        "RESET_PASSWORD": BASE_URL+"suppliers/profile/change_password",
		        "DASHBOARD": BASE_URL+"suppliers/dashboard?",
		        "BOOKINGS_LIST": "./../data/bookings.json?",   
		        "BOOKINGS_DETAILS": "./../data/bookingDetails.json?", 
		        "PROFILE":  "./../data/profile.json"  ,
		        "LISTING": "./../data/listing.json?",
		        "LISTING_DETAILS": "./../data/listingDetails.json?" ,
		        "NOTIFICATIONS": "./../data/notification.json?",
		        "VARIANT": "./../data/variant.json?"   

			}
	     var prodConfig = {
				"CREATE_ACCOUNT": BASE_URL+"suppliers/sign_up",
		        "LOGIN": BASE_URL+"suppliers/sign_in",
		        "SEND_RESET_PASSWORD_EMAIL": BASE_URL+"suppliers/password",
		        "RESET_PASSWORD": BASE_URL+"suppliers/profile/change_password",
		        "DASHBOARD": BASE_URL+"suppliers/dashboard?",
		        "BOOKINGS_LIST": BASE_URL+"suppliers/bookings?",
		        "BOOKINGS_DETAILS": BASE_URL+"suppliers/bookings/",
		        "PROFILE": BASE_URL+"suppliers/profile",
		        "LISTING": BASE_URL+"suppliers/tours?",
		        "LISTING_DETAILS": "./../data/listingDetails.json?" ,
		        "NOTIFICATIONS": BASE_URL+"suppliers/notifications?"  ,
		        "PROFILE_SAVE": BASE_URL+ "suppliers/profile?",
		        "COUNTRIES": BASE_URL+ "suppliers/countries?",
		        "STATE": BASE_URL+"suppliers/states?",
		        "CITIES": BASE_URL+"suppliers/cities?" 

			}

		   if(ENV == "prod"){
		   		return  prodConfig;
		   }else{
		   		return devConfig;
		   }
			
		}
		function httpInterceptor(url, methodType, bodyParams, headers={}, urlParams={}){
			//setClientInfo();
			var params = (!$.isEmptyObject(urlParams)) ? $.param(urlParams): "";
			console.log(params);
			if($.isEmptyObject(headers)){
				var beforesend = function(){};
			}else{
				console.log(headers);
				var beforesend = function(request)
			            {
			                request.setRequestHeader(headers[0][0], headers[0][1]);
			                request.setRequestHeader(headers[1][0], headers[1][1]);
			                request.setRequestHeader("Access-Control-Allow-Origin", "*");
			                
                        }
			}
			var promise = new Promise(function(resolve, reject)  {
				$.ajax({type: methodType, url: url+params, data: bodyParams,
					headers: headers,
					
					   success: function (result) {
	                        //self.props.route.notification._addNotification(e, "success", "Successfully registered !!!");
	                        //window.location.href="/#/thank-you";
				            resolve(result);
				        },error: function(result){
				          //console.log(result.responseText);
				          //let message = JSON.parse(result.responseText);
				          //self.props.route.notification._addNotification(e, "error", message.message);
				          reject(result);
				        }}); 
				});
			return promise;
		}
		function redirectWithoutSession(){
			if(!localStorage.getItem("clientInfo")){
				window.location.href = "/#/";
			}
			
		}
		
		function getClientInfo(){
			
			return {
				"client_id": JSON.parse(localStorage.getItem("clientInfo")).client.client_id,
				"auth_token": JSON.parse(localStorage.getItem("clientInfo")).client.authentication_token
			}
		}
		var listing = {};
		function setListing(listingObj){
				listing = listingObj;
				console.log(listing);
		}

		function getListing(){
			console.log(listing);
			return listing;
		}
		return {
			url: url,
			httpInterceptor: httpInterceptor,
			redirectWithoutSession: redirectWithoutSession,
			getClientInfo: getClientInfo,
			setListing: setListing,
			getListing: getListing
		}
	}
}