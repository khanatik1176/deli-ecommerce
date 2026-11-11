function renderAllRecaptchas(siteKey) {
	var countId = 0;
	var recaptchaWidgets = {}; 
	document.querySelectorAll('form.onst-custom-form').forEach(function (form) {
		if( form.querySelector('.onst-custom-form-submit') ){
			var dataSecurity = form.querySelector('.onst-custom-form-submit').getAttribute('data-security');
			if( dataSecurity == 'true' ){
				var captchaId = 'surerecaptcha-'+countId;
				// Make sure the actual element exists
				var captchaElement =
					document.getElementById(captchaId);

				if (!captchaElement) {
					console.log(
						'reCAPTCHA element not found:',
						captchaId
					);
					return;
				}
				// Avoid re-render
				if (recaptchaWidgets[captchaId]) return;
				if (typeof grecaptcha === 'undefined' || !grecaptcha.render) {
					console.error('reCAPTCHA not ready');
					return;
				}
				recaptchaWidgets[captchaId] = grecaptcha.render(captchaId, {
					sitekey: siteKey,
					callback: function (token) {
						if( form.querySelector('.onst-custom-form-submit') ){
							form.querySelector('.onst-custom-form-submit').setAttribute('data-security', false);
							form.querySelector('.onst-custom-form-submit').removeAttribute('disabled');
						}
					},
					'expired-callback': function () {
						if( form.querySelector('.onst-custom-form-submit') ){
							form.querySelector('.onst-custom-form-submit').setAttribute('data-security', true);
							form.querySelector('.onst-custom-form-submit').disabled=true;
						}
					}
				});
				countId = countId+1;
			}
		}
	});
}

function onReady() {
	var customforms = document.querySelectorAll('.onst-custom-form-box');
	var appurl = 'https://approve.surecust.com';
	
	var formsQueue = []; // Queue to store forms to be processed
	var country_state = 0;
	var country_state_js_url = '';
	var brandingadded = false;
	
	if (customforms.length > 0) {
        // Enqueue forms to the queue
		var shopUrl = '';
		var customerId = '';
        customforms.forEach(formBox => {
            formsQueue.push(formBox);
			shopUrl = formBox.getAttribute('data-shop');
			customerId = formBox.getAttribute('data-customer');
        });
        processNextForm(shopUrl, customerId);
    }

	function checkStep(step, target){
		var required = 0;
		var formElement = target.closest('form');
		var formInputs = formElement.querySelectorAll("input");
		var formSelects = formElement.querySelectorAll("select");
		var formTextareas = formElement.querySelectorAll("textarea");
		var formInputWarning = formElement.querySelectorAll(".onst-warning");
		var successmessage = formElement.querySelectorAll(".onst-success-message");

		formInputWarning.forEach(warningElement => {
			warningElement.classList.remove('onstactive');
		});
		successmessage.forEach(successmessageE => {
			successmessageE.classList.remove('onstactive');
		});
		var checkWorkEmail = false;
		var checkNameValidation = false;
		var shopDomain = '';
		formInputs.forEach(formInput => {
			var parentField = formInput.closest('.onst-field');
			if( parentField && parentField.getAttribute('data-step') == step ){
				var checkData = formInput.getAttribute('data-required');
				var checkType = formInput.getAttribute('type');
				var checkName = formInput.getAttribute('name');
				if( checkData == 'true' ){
					if( checkType == 'radio' || checkType == 'checkbox' ){
						var getName = formInput.getAttribute('name');
						if( checkType == 'checkbox' ){
							var checkboxes = formElement.elements[getName];
							var checkedValues = [];
							if (!checkboxes.length) {
							checkboxes = [checkboxes];
							}
							for (var i = 0; i < checkboxes.length; i++) {
							// Check if the checkbox is checked
							if (checkboxes[i].checked) {
								// If checked, add its value to the array of checked values
								checkedValues.push(checkboxes[i].value);
							}
							}
							if( checkedValues.length > 0 ){}else{
								required = 1;
								var formRadioBox = formInput.closest('.onst-field');
								var formRadioWarning = formRadioBox.querySelectorAll(".onst-warning");
								formRadioWarning.forEach(warningElement => {
									warningElement.classList.add('onstactive');
								});
							}
						}else{
							var radioFieldValue = formElement.elements[getName].value;
							if( radioFieldValue !== '' ){}else{
								required = 1;
								var formRadioBox = formInput.closest('.onst-field');
								var formRadioWarning = formRadioBox.querySelectorAll(".onst-warning");
								formRadioWarning.forEach(warningElement => {
									warningElement.classList.add('onstactive');
								});
							}
						}
					}else{
						if( formInput.value !== '' ){
							if( checkType == 'email' ){
								var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
								if (!emailRegex.test(formInput.value)) {
									required = 1;
									var formInputBox = formInput.closest('.onst-field');
									var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
									formInputWarning.forEach(warningElement => {
										var warningText = warningElement.getAttribute('data-valid');
										warningElement.innerText=warningText;
										warningElement.classList.add('onstactive');
									});
								}
							}
							if( checkNameValidation == true ){
								if( checkName == 'First Name' || checkName == 'Last Name' ){
									var nameFail = false;
									if (formInput.value.length > 10) {
										nameFail = true;
									}
									var capitals = formInput.value.match(/[A-Z]/g) || [];
									if (capitals.length > 3){
										nameFail = true;
									}
									if( nameFail == true ){
										required = 1;
										var formInputBox = formInput.closest('.onst-field');
										var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
										formInputWarning.forEach(warningElement => {
											var warningText = "Please enter a valid value (max 10 characters, max 3 capital letters).";
											warningElement.innerText=warningText;
											warningElement.classList.add('onstactive');
										});
									}
								}
							}
						}else{
							if( checkType == 'email' ){
								required = 1;
								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
								formInputWarning.forEach(warningElement => {
									var warningText = warningElement.getAttribute('data-required');
									warningElement.innerText=warningText;
									warningElement.classList.add('onstactive');
								});
							}else{
								required = 1;
								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
								formInputWarning.forEach(warningElement => {
									warningElement.classList.add('onstactive');
								});
							}
						}
					}
				}
				if( checkName ){
					if( checkName.includes("surecust") ){
						if( formInput.value !== '' ){
							required = 1;
						}else{
							var checkTime = checkName;
							checkTimeString = checkTime.replace("surecust-", "");
							var suresubid = Date.now().toString(); 
							var diff = suresubid - checkTimeString;
							var seconds = diff / 1000;
							if( seconds > 5 ){}else{
								required = 1;
							}
						}
					}
				} 
			}else{
				var checkName = formInput.getAttribute('name');
				if( checkName ){
					if( checkName == 'wcustomer[shop]' ){
						shopDomain = formInput.value;
						if( formInput.value == 'specialneedscomputers.myshopify.com' ){
							checkNameValidation = true;
						}
						if( formInput.value == 'hpfqrt-1a.myshopify.com' ){
							checkWorkEmail = true;
						}
					}
				} 
			}
		});
		if( checkWorkEmail == true ){
			const emailDomains = [
				'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com',
				'mail.com', 'protonmail.com', 'yandex.com', 'mail.ru', 'rambler.ru', 'live.com',
				'msn.com', 'rediffmail.com', 'zoho.com', 'fastmail.com', 'inbox.com', 'gmx.com',
				'yahoo.co.uk', 'yahoo.ca', 'yahoo.co.in', 'yahoo.com.au', 'yahoo.fr', 'yahoo.de',
				'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.com.au', 'hotmail.co.uk',
				'hotmail.fr', 'hotmail.de', 'hotmail.com.au', 'live.co.uk', 'live.fr', 'live.de',
				'live.com.au', 'me.com', 'mac.com', 'icloud.com'
			];
			formInputs.forEach(formInput => {
				var parentField = formInput.closest('.onst-field');
				if( parentField && parentField.getAttribute('data-step') == step ){
					if( formInput.getAttribute('name') == 'wcustomer[email]' ){
						var emailCheck = formInput.value;
						var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
						if (!emailRegex.test(formInput.value)) {}else{
							var domain = formInput.value.split('@')[1];
							if( emailDomains.includes(domain.toLowerCase()) ){
								required = 1;
								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
								formInputWarning.forEach(warningElement => {
									warningElement.innerText="Please use work email.";
									warningElement.classList.add('onstactive');
								});
							}
						}
					}
				}
			});
		}

		formSelects.forEach(formSelect => {
			var parentField = formSelect.closest('.onst-field');
			if( parentField && parentField.getAttribute('data-step') == step ){
				var checkData = formSelect.getAttribute('data-required');
				if( checkData == 'true' ){
					if( formSelect.value !== '' ){}else{
						required = 1;
						var formSelectBox = formSelect.closest('.onst-field');
						var formSelectWarning = formSelectBox.querySelectorAll(".onst-warning");
						formSelectWarning.forEach(warningElement => {
							warningElement.classList.add('onstactive');
						});
					}
				}
			}
		});
		formTextareas.forEach(formTextarea => {
			var parentField = formTextarea.closest('.onst-field');
			if( parentField && parentField.getAttribute('data-step') == step ){
				var checkData = formTextarea.getAttribute('data-required');
				if( checkData == 'true' ){
					if( formTextarea.value !== '' ){}else{
						required = 1;
						var formTextareaBox = formTextarea.closest('.onst-field');
						var formTextareaWarning = formTextareaBox.querySelectorAll(".onst-warning");
						formTextareaWarning.forEach(warningElement => {
							warningElement.classList.add('onstactive');
						});
					}
				}
			}
		});
		if( required == 0 ){
			if( shopDomain == 'diamas-co.myshopify.com' ){
				var formData = {};
				for (var i = 0; i < formElement.elements.length; i++) {
					var element = formElement.elements[i];
					if (element.tagName !== "BUTTON" && element.name !== 'h-captcha-response' && element.name !== 'g-recaptcha-response' ) {
						if (element.type === "checkbox") {
							if( element.name == "wcustomer[subscribe]" ){
								if( element.checked ){
									formData[element.name] = true;
								}else{
									formData[element.name] = false;
								}
							}else{
								var checkboxes = formElement.elements[element.name];
								var checkedValues = [];
								if (!checkboxes.length) {
								checkboxes = [checkboxes];
								}
								for (var j = 0; j < checkboxes.length; j++) {
								// Check if the checkbox is checked
								if (checkboxes[j].checked) {
									// If checked, add its value to the array of checked values
									checkedValues.push(checkboxes[j].value);
								}
								}
								formData[element.name] = checkedValues;
							}
						}else{
							if (element.type === "radio") {
								formData[element.name] = formElement.elements[element.name].value;
							}else{
								if( element.name && element.name.includes("surecust") ){}else{
									formData[element.name] = element.value;
								}
							}
						}
					}
				}
				var postData = formData;
				var formSubmissionUrl = '/api/hubspotstepdata';
				fetch(appurl+''+formSubmissionUrl,{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json', // Set the content type to JSON
					},
					body: JSON.stringify(postData), // Convert the data to JSON format
				}).then(response => {
					// Check if the request was successful
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					// Parse the response as JSON and return it
					return response.json();
				}).then(data => {
					console.log(data);
				}).catch(error => {
					console.log(error);
				});
			}
		}
		return required;
	}

	function backStep(step, target){
		var formElement = target.closest('form');
		var allFields = formElement.querySelectorAll('.onst-field');
		var allFieldsGroup = formElement.querySelectorAll('.onst-field-group-box');
		var finalStep = formElement.querySelectorAll('.final-step');
		allFields.forEach(allField => {
			allField.classList.remove('step-active');
		});
		allFieldsGroup.forEach(allField => {
			allField.classList.remove('step-active');
		});
		finalStep.forEach(allField => {
			allField.classList.remove('step-active');
		});
		allFieldsGroup.forEach(allField => {
			if( allField.getAttribute('data-step') == step ){
				allField.classList.add('step-active');
			}
		});
		allFields.forEach(allField => {
			if( allField.getAttribute('data-step') == step ){
				allField.classList.add('step-active');
			}
		});
		finalStep.forEach(allField => {
			if( allField.getAttribute('data-step') == step ){
				allField.classList.add('step-active');
			}
		});
		formElement.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}

	function initPhoneField(wrapper) {
		const select = wrapper.querySelector('select');
		const input = wrapper.querySelector('input');

		if (!select || !input) return;

		input.addEventListener('focus', () => {
			const code = select.value;
			if (!input.value.startsWith(code)) {
			input.value = code + ' ';
			input.setSelectionRange(input.value.length, input.value.length);
			}
		});

		select.addEventListener('change', () => {
			const code = select.value;
			input.value = code + ' ';
			input.focus();
			input.setSelectionRange(input.value.length, input.value.length);
		});
	}

	function formCreation(formBox, data, customerId, shop, formId, productId, productTitle){
		formBox.innerHTML="";
		var formIdCorrect = false;
		if( data.data == 'empty' ){}else{
			if( data.data.length > 0 ){
				var formData = data.data[0];
				var formFields = JSON.parse(formData.settings);
				var formFieldHtml = '';
				var loginposition = 'bottom';
				var loginprefix = 'Already have an account?';
				var emailalready = 'Email Already Taken! Try a different Email or Login';
				var formType = formData.type;
				var reCaptcha = false;
				var reCaptchaV = 'v2';
				var phoneCountry = true;
				var defaultPhoneCountry = "+1";
				var redirectSubmission = '';
				if( formData.extradata ){
					var extradataForm = JSON.parse(formData.extradata);
					if( extradataForm.integrations ){
						extradataForm.integrations.forEach(integration => {
							if( integration.type = "gcaptcha" ){
								if( integration.status ){
									reCaptcha = true;
								}
								if( integration.version == "gcaptchav3" ){
									reCaptchaV = 'v3';
								}
							}
						})
					}
					if( extradataForm.successred ){
						redirectSubmission = extradataForm.successred;
					}
					if( extradataForm.phonedisable ){
						phoneCountry = false;
					}
					if( extradataForm.phonetitle && extradataForm.phonetitle !== '' ){
						defaultPhoneCountry = extradataForm.phonetitle;
					}
				}
				if( formType == 'poscustomer' ){}else{
					if( formData.loginposition ){
						if( formData.loginposition == 'top' ){
							loginposition = 'top';
						}
					}
					if( formData.emailalready ){
						if( formData.emailalready !== null ){
							emailalready = formData.emailalready;
						}
					}
					if( formData.loginprefix ){
						if( formData.loginprefix !== null ){
							loginprefix = formData.loginprefix;
						}
					}
					var dynamicConditions = [];
					if( formFields.length > 0 ){
						var rearrangedArray = rearrangeArrayByPosition(formFields);
						if( formType == 'wholesale' || formType == 'customer' ){
							if( loginposition == 'top' ){
								if( formData.login !== '' ){
									formFieldHtml += '<div class="onst-backtologin top-login-link">'+loginprefix+' <a href="/account/login">'+formData.login+'</a></div>';
								}
							}
						}
						formFieldHtml += '<div class="onst-registration-form-container-box SureCust-App">';
						formFieldHtml += '<form method="post" class="onst-custom-form onst-show-labels SureCust-App" action="/account" autocomplete="on" accept-charset="UTF-8" data-type="'+formType+'">';
							formFieldHtml += '<input type="hidden" name="form_type" value="create_customer">';
							formFieldHtml += '<input type="hidden" name="wcustomer[id]" value="'+customerId+'">';
							formFieldHtml += '<input type="hidden" name="wcustomer[shop]" value="'+shop+'">';
							formFieldHtml += '<input type="hidden" name="wcustomer[formid]" value="'+formId+'">';
							formFieldHtml += '<input type="hidden" name="wcustomer[formtype]" value="'+formType+'">';
							var sureid = Date.now().toString(); 
							formFieldHtml += '<input type="text" name="surecust-'+sureid+'" style="display:none !important;">';

							if( formType == 'productenquiry' ){
								formFieldHtml += '<input type="hidden" name="wcustomer[productid]" value="'+productId+'">';
								formFieldHtml += '<input type="hidden" name="wcustomer[producttitle]" value="'+productTitle+'">';
							}
							var stepStart = 0;
							var groupStart = false;
							var groupEnd = false;
							var endGroupPresent = false;
							rearrangedArray.forEach(function(fieldcheck,index){
								if( fieldcheck.type == 'group_end' ){
									endGroupPresent = true;
								}
							});
							formFieldHtml += '<div class="onst-register-form-fields SureCust-App">';
							rearrangedArray.forEach(function(field,index){
								var stepClass = '';
								if( stepStart == 0 ){
									stepClass = 'step-active';
								}
								if( field.type == "first_name" || field.type == "last_name" || field.type == "text" || field.type == "password" || field.type == "number" || field.type == "tel" || field.type == "customer_phone" || field.type == "customer_password" || field.type == "datepicker" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.type == "password" || field.type == "customer_password" ){
												if( field.label !== '' ){
													formFieldHtml += '<label for="wRegisterForm-password-'+index+'" data-required="'+field.require+'">';
														formFieldHtml += field.label;
													formFieldHtml += '</label>';
												}
												formFieldHtml += '<div class="onst-password-field"><input type="password" name="'+field.name+'" id="wRegisterForm-password-'+index+'" placeholder="'+field.placeholder+'" data-required="'+field.require+'"><span class="password-view-js">&#128065;</span></div>';
											}else if( field.type == "number" ){
												if( field.label !== '' ){
													formFieldHtml += '<label for="wRegisterForm-number-'+index+'" data-required="'+field.require+'">';
														formFieldHtml += field.label;
													formFieldHtml += '</label>';
												}
												formFieldHtml += '<input type="number" min="'+field.min+'" max="'+field.max+'" name="'+field.name+'" id="wRegisterForm-number-'+index+'" autocomplete="on" placeholder="'+field.placeholder+'" data-required="'+field.require+'">';
											}else if( field.type == "tel" || field.type == "customer_phone" ){
												if( field.label !== '' ){
													formFieldHtml += '<label for="wRegisterForm-tel-'+index+'" data-required="'+field.require+'">';
														formFieldHtml += field.label;
													formFieldHtml += '</label>';
												}
												formFieldHtml += '<input type="tel" data-default="'+defaultPhoneCountry+'" data-suggession="'+phoneCountry+'" name="'+field.name+'" id="wRegisterForm-tel-'+index+'" autocomplete="on" placeholder="'+field.placeholder+'" data-required="'+field.require+'">';
											}else if( field.type == "datepicker" ){
												if( field.label !== '' ){
													formFieldHtml += '<label for="wRegisterForm-tel-'+index+'" data-required="'+field.require+'">';
														formFieldHtml += field.label;
													formFieldHtml += '</label>';
												}
												formFieldHtml += '<input type="date" name="'+field.name+'" id="wRegisterForm-tel-'+index+'" data-required="'+field.require+'">';
											}else{
												if( field.label !== '' ){
													formFieldHtml += '<label for="wRegisterForm-text-'+index+'" data-required="'+field.require+'">';
														formFieldHtml += field.label;
													formFieldHtml += '</label>';
												}
												formFieldHtml += '<input type="text" name="'+field.name+'" id="wRegisterForm-text-'+index+'" autocomplete="on" placeholder="'+field.placeholder+'" data-required="'+field.require+'">';
											}
											if( field.requiremsg !== '' ){
												formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning">This field is required.</span>';
											}
											formFieldHtml += '</div>';
								}else if( field.type == "customer_email" || field.type == "email" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.label !== '' ){
												formFieldHtml += '<label for="wRegisterForm-email-'+index+'" data-required="'+field.require+'">';
													formFieldHtml += field.label;
												formFieldHtml += '</label>';
											}
											formFieldHtml += '<input type="email" name="'+field.name+'" id="wRegisterForm-email-'+index+'" autocomplete="on" placeholder="'+field.placeholder+'" data-required="'+field.require+'">';
											var customer_email_class = "extra-email-onst";
											if( field.type == "customer_email" ){
												customer_email_class = "customer-email-onst";
											}
											if( field.requiremsg !== '' ){
												if( field.validationmsg !== '' ){
													formFieldHtml += '<span class="onstw-email-warning onst-warning '+customer_email_class+'" data-required="'+field.requiremsg+'" data-valid="'+field.validationmsg+'" data-already="'+emailalready+'"></span>';
												}else{
													formFieldHtml += '<span class="onstw-email-warning onst-warning '+customer_email_class+'" data-required="'+field.requiremsg+'" data-valid="Please enter a valid email address." data-already="'+emailalready+'"></span>';
												}
											}else{
												if( field.validationmsg !== '' ){
													formFieldHtml += '<span class="onstw-email-warning onst-warning '+customer_email_class+'" data-required="This field is required." data-valid="'+field.validationmsg+'" data-already="'+emailalready+'"></span>';
												}else{
													formFieldHtml += '<span class="onstw-email-warning onst-warning '+customer_email_class+'" data-required="This field is required." data-valid="Please enter a valid email address." data-already="'+emailalready+'"></span>';
												}
											}
											formFieldHtml += '</div>';
								}else if( field.type == "textarea" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.label !== '' ){
												formFieldHtml += '<label for="wRegisterForm-textarea-'+index+'" data-required="'+field.require+'">';
													formFieldHtml += field.label;
												formFieldHtml += '</label>';
											}
											formFieldHtml += '<textarea rows="5" name="'+field.name+'" id="wRegisterForm-textarea-'+index+'" placeholder="'+field.placeholder+'" data-required="'+field.require+'"></textarea>';
											if( field.requiremsg !== '' ){
												formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning">This field is required.</span>';
											}
											formFieldHtml += '</div>';
								}else if( field.type == "select" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.label !== '' ){
												formFieldHtml += '<label for="wRegisterForm-select-'+index+'">';
													formFieldHtml += field.label;
												formFieldHtml += '</label>';
											}
											formFieldHtml += '<select id="wRegisterForm-select-'+index+'" name="'+field.name+'" data-required="'+field.require+'">';
												if( field.options.length > 0 ){
													field.options.forEach(function(option,index){
														formFieldHtml += '<option value="'+option.value+'">'+option.label+'</option>';
													});
												}
											formFieldHtml += '</select>';
											if( field.requiremsg !== '' ){
												formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning">This field is required.</span>';
											}
											formFieldHtml += '</div>';
								}else if( field.type == "radio" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.label !== '' ){
												formFieldHtml += '<label for="wRegisterForm-radio-'+index+'" data-required="'+field.require+'">';
													formFieldHtml += field.label;
												formFieldHtml += '</label>';
											}
											formFieldHtml += '<div class="onst-field-roptions">';
												if( field.roptions.length > 0 ){
													var outerIndex = index;
													field.roptions.forEach(function(option,index){
														formFieldHtml += '<div class="onst-field-roptions-item">';
															formFieldHtml += '<label for="wRegisterForm-radio-'+outerIndex+'-inner-'+index+'" data-required="'+field.require+'">';
																if( option.checked == "yes" ){
																	formFieldHtml += '<input type="radio" name="'+field.name+'" id="wRegisterForm-radio-'+outerIndex+'-inner-'+index+'" value="'+option.value+'"  data-required="'+field.require+'" checked>';
																}else{
																	formFieldHtml += '<input type="radio" name="'+field.name+'" id="wRegisterForm-radio-'+outerIndex+'-inner-'+index+'" value="'+option.value+'"  data-required="'+field.require+'">';
																}
																formFieldHtml += '<span class="onst-field-roption-value">'+option.label+'</span>';
															formFieldHtml += '</label>';
															if( option.description !== '' ){
																formFieldHtml += '<p>'+option.description+'</p>';
															}
														formFieldHtml += '</div>';
													});
												}
											formFieldHtml += '</div>';
											if( field.requiremsg !== '' ){
												formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning">This field is required.</span>';
											}
											formFieldHtml += '</div>';
								}else if( field.type == "checkbox" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											if( field.label !== '' ){
												formFieldHtml += '<label for="wRegisterForm-radio-'+index+'" data-required="'+field.require+'">';
													formFieldHtml += field.label;
												formFieldHtml += '</label>';
											}
											formFieldHtml += '<div class="onst-field-roptions">';
												if( field.roptions.length > 0 ){
													var outerIndex = index;
													field.roptions.forEach(function(option,index){
														formFieldHtml += '<div class="onst-field-roptions-item">';
															formFieldHtml += '<label for="wRegisterForm-checkbox-'+outerIndex+'-inner-'+index+'" data-required="'+field.require+'">';
																if( option.checked == "yes" ){
																	formFieldHtml += '<input type="checkbox" name="'+field.name+'" id="wRegisterForm-checkbox-'+outerIndex+'-inner-'+index+'" value="'+option.value+'" data-required="'+field.require+'" checked>';
																}else{
																	formFieldHtml += '<input type="checkbox" name="'+field.name+'" id="wRegisterForm-checkbox-'+outerIndex+'-inner-'+index+'" value="'+option.value+'" data-required="'+field.require+'">';
																}
																formFieldHtml += '<span class="onst-field-roption-value">'+option.label+'</span>';
															formFieldHtml += '</label>';
															if( option.description !== '' ){
																formFieldHtml += '<p>'+option.description+'</p>';
															}
														formFieldHtml += '</div>';
													});
												}
											formFieldHtml += '</div>';
											if( field.requiremsg !== '' ){
												formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning">This field is required.</span>';
											}
											formFieldHtml += '</div>';
								}else if( field.type == "country_state" ){
									formFieldHtml += '<div class="onst-field onst-size-full '+stepClass+'" data-step="'+stepStart+'">';
										if( field.clabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-country-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.clabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<select class="onstcountryselector" name="'+field.cname+'" id="wRegisterForm-country-'+index+'" data-placeholder="'+field.cplaceholder+'" data-required="'+field.require+'"></select>';
										if( field.crequiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.crequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-full hidden-onst '+stepClass+'" data-step="'+stepStart+'">';
										if( field.slabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-state-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.slabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<select class="onststateselector" name="'+field.sname+'" id="wRegisterForm-state-'+index+'" data-placeholder="'+field.splaceholder+'" data-required="'+field.require+'"></select>';
										if( field.srequiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.srequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
										country_state++;
								}else if( field.type == "customer_address" ){
									formFieldHtml += '<div class="onst-field onst-size-full '+stepClass+'" data-step="'+stepStart+'">';
										if( field.address1label !== '' ){
											formFieldHtml += '<label for="wRegisterForm-address1-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.address1label;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<input type="text" name="'+field.address1name+'" id="wRegisterForm-address1-'+index+'" autocomplete="on" placeholder="'+field.address1placeholder+'" data-required="'+field.require+'">';
										if( field.address1requiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.address1requiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-full '+stepClass+'" data-step="'+stepStart+'">';
										if( field.address2label !== '' ){
											formFieldHtml += '<label for="wRegisterForm-address2-'+index+'" data-required="false">';
												formFieldHtml += field.address2label;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<input type="text" name="'+field.address2name+'" id="wRegisterForm-address2-'+index+'" autocomplete="on" placeholder="'+field.address2placeholder+'" data-required="false">';
										if( field.address2requiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.address2requiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-half '+stepClass+'" data-step="'+stepStart+'">';
										if( field.ctylabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-city-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.ctylabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<input type="text" name="'+field.ctyname+'" id="wRegisterForm-city-'+index+'" autocomplete="on" placeholder="'+field.ctyplaceholder+'" data-required="'+field.require+'">';
										if( field.ctyrequiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.ctyrequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-half '+stepClass+'" data-step="'+stepStart+'">';
										if( field.ziplabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-zip-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.ziplabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<input type="text" name="'+field.zipname+'" id="wRegisterForm-zip-'+index+'" autocomplete="on" placeholder="'+field.zipplaceholder+'" data-required="'+field.require+'">';
										if( field.ziprequiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.ziprequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-full '+stepClass+'" data-step="'+stepStart+'">';
										if( field.clabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-country-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.clabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<select class="onstcountryselector" name="'+field.cname+'" id="wRegisterForm-country-'+index+'" data-placeholder="'+field.cplaceholder+'" data-required="'+field.require+'"></select>';
										if( field.requiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.crequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
									formFieldHtml += '<div class="onst-field onst-size-full hidden-onst '+stepClass+'" data-step="'+stepStart+'">';
										if( field.slabel !== '' ){
											formFieldHtml += '<label for="wRegisterForm-state-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.slabel;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<select class="onststateselector" name="'+field.sname+'" id="wRegisterForm-state-'+index+'" data-placeholder="'+field.splaceholder+'" data-required="'+field.require+'"></select>';
										if( field.requiremsg !== '' ){
											formFieldHtml += '<span class="onst-warning">'+field.srequiremsg+'</span>';
										}else{
											formFieldHtml += '<span class="onst-warning">This field is required.</span>';
										}
										formFieldHtml += '</div>';
										country_state++;
								}else if( field.type == "title" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
										formFieldHtml += '<h4 class="onst-field-title" data-name="'+field.name+'">';
											formFieldHtml += field.name;
										formFieldHtml += '</h4>';
									formFieldHtml += '</div>';
								}else if( field.type == "description" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
										formFieldHtml += '<div class="descriptionbox" data-name="'+field.name+'">';
											formFieldHtml += field.description;
										formFieldHtml += '</div>';
									formFieldHtml += '</div>';
								}else if( field.type == "customer_subscribe" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
									formFieldHtml += '<div class="onst-field-roptions">';
										formFieldHtml += '<div class="onst-field-roptions-item">';
												formFieldHtml += '<label for="wRegisterForm-subscibe-checkbox" data-required="'+field.require+'">';
													if( field.checked ){
														formFieldHtml += '<input type="checkbox" name="'+field.name+'" id="wRegisterForm-subscibe-checkbox" value="true" data-required="'+field.require+'" checked>';
													}else{
														formFieldHtml += '<input type="checkbox" name="'+field.name+'" id="wRegisterForm-subscibe-checkbox" value="true" data-required="'+field.require+'">';
													}
													formFieldHtml += '<span class="onst-field-roption-value">'+field.label+'</span>';
												formFieldHtml += '</label>';
												if( field.description !== '' ){
													formFieldHtml += '<p>'+field.description+'</p>';
												}
											formFieldHtml += '</div>';
									formFieldHtml += '</div>';
									if( field.requiremsg !== '' ){
										formFieldHtml += '<span class="onst-warning">'+field.requiremsg+'</span>';
									}else{
										formFieldHtml += '<span class="onst-warning">This field is required.</span>';
									}
									formFieldHtml += '</div>';
								}else if( field.type == "upload" ){
									formFieldHtml += '<div class="onst-field onst-upload-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
										if( field.label !== '' ){
											formFieldHtml += '<label for="wRegisterForm-upload-'+index+'" data-required="'+field.require+'">';
												formFieldHtml += field.label;
											formFieldHtml += '</label>';
										}
										formFieldHtml += '<div class="onst-field-upload-box">';
											formFieldHtml += '<div class="onst-file-input">';
												if( field.placeholder !== "" ){
													formFieldHtml += '<label for="wRegisterForm-upload-'+index+'" data-required="'+field.require+'"><span class="onst-upload-icon"></span><div>'+field.placeholder+'<span class="onst-selected-file-name"></span></div></label>';
												}else{
													formFieldHtml += '<label for="wRegisterForm-upload-'+index+'" data-required="'+field.require+'"><span class="onst-upload-icon"></span><div>Choose a file:<span class="onst-selected-file-name"></span></div></label>';
												}
												formFieldHtml += '<input type="file" id="wRegisterForm-upload-'+index+'" data-required="'+field.require+'"><div class="upload-file-loader"><span class="upload-loader-progress"></span></div>';
											formFieldHtml += '</div>';
											formFieldHtml += '<input type="hidden" name="'+field.name+'">';
										formFieldHtml += '</div>';
										if( field.description !== '' ){
											formFieldHtml += '<p>'+field.description+'</p>';
										}
										if( field.requiremsg !== '' ){
											if( field.validationmsg !== '' ){
												formFieldHtml += '<span class="onst-warning" data-required="'+field.requiremsg+'" data-valid="'+field.validationmsg+'">'+field.requiremsg+'</span>';
											}else{
												formFieldHtml += '<span class="onst-warning" data-required="'+field.requiremsg+'" data-valid="File size exceeds 5MB limit.">'+field.requiremsg+'</span>';
											}
										}else{
											if( field.validationmsg !== '' ){
												formFieldHtml += '<span class="onst-warning" data-required="This field is required." data-valid="'+field.validationmsg+'">This field is required.</span>';
											}else{
												formFieldHtml += '<span class="onst-warning" data-required="This field is required." data-valid="File size exceeds 5MB limit.">This field is required.</span>';
											}
										}
									formFieldHtml += '</div>';
								}else if( field.type == "step_divider" ){
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
										formFieldHtml += '<button type="button" data-step="'+stepStart+'" class="onst-custom-form-step button btn">'+field.label+'</button>';
									formFieldHtml += '</div>';
									stepStart = stepStart+1;
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+'" data-step="'+stepStart+'">';
										formFieldHtml += '<a href="#" class="onst-custom-form-prev-step" data-step="'+stepStart+'">'+field.placeholder+'</a>';
									formFieldHtml += '</div>';
								}else if( field.type == "group_start" ){
									if( endGroupPresent == true && groupEnd == false ){
										formFieldHtml += '<div class="onst-field-group-box '+stepClass+'" data-step="'+stepStart+'">';
										groupStart = true;
									}
									formFieldHtml += '<div class="onst-field onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
										formFieldHtml += '<h4 class="onst-field-title group-field-title" data-name="'+field.name+'">';
											formFieldHtml += '<span class="group-title-content"><span class="group-count">#1</span> '+field.label+'</span>';
										formFieldHtml += '</h4>';
									formFieldHtml += '</div>';
								}else if( field.type == "group_end" ){
									groupEnd = true;
									if( groupStart == true ){
										formFieldHtml += '</div>';
										formFieldHtml += '<div class="onst-field text-align-left onst-size-'+field.size+' '+stepClass+'" data-step="'+stepStart+'">';
											formFieldHtml += '<button type="button" class="onst-custom-form-group button btn" data-remove="'+field.placeholder+'">'+field.label+'</button>';
										formFieldHtml += '</div>';
									}
								}else{
								}
								if( field.dynamic ){
									if( field.dynamicname !== "noselection" ){
										if( field.type == "customer_address" ){
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.address1name,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.address2name,
												require:false,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.cname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.ctyname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.sname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.zipname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
										}else if( field.type == "country_state" ){
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.cname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.sname,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
										}else{
											var dynamicObject = {
												dynamicname:field.dynamicname,
												name:field.name,
												require:field.require,
												dynamicvalue:field.dynamicvalue,
												dynamiccondition:field.dynamiccondition,
												dynamicaction:field.dynamicaction,
												type:field.type
											}
											dynamicConditions.push(dynamicObject);
										}
									}
								}
							});
							formFieldHtml += '</div>';
							var	stepClassFinal = '';
							if( stepStart == 0 ){
								stepClassFinal = 'step-active';
							}
							formFieldHtml += '<div class="final-step '+stepClassFinal+'" data-step="'+stepStart+'">';
								if( reCaptcha == true ){
									if( reCaptchaV == 'v2' ){
										formFieldHtml += '<div class="recaptcha-box"></div>';
									}else{
										formFieldHtml += '<div class="recaptcha-score"></div>';
									}
								}
								if( formData.submit !== '' ){
									formFieldHtml += '<button type="button" data-security="'+reCaptcha+'" class="onst-custom-form-submit button btn" data-type="'+formType+'">'+formData.submit+'<span>&#9862;</span></button>';
								}else{
									formFieldHtml += '<button type="button" data-security="'+reCaptcha+'" class="onst-custom-form-submit button btn" data-type="'+formType+'">Submit<span>&#9862;</span></button>';
								}
								if( formType == 'wholesale' || formType == 'customer' ){
									if( loginposition == 'bottom' ){
										if( formData.login !== '' ){
											formFieldHtml += '<div class="onst-backtologin">'+loginprefix+' <a href="/account/login">'+formData.login+'</a></div>';
										}
									}
								}
								formFieldHtml += '<div class="onstw-register-message onst-success-message" data-redirect="'+redirectSubmission+'">'+formData.success+'</div>';
							formFieldHtml += '</div>';

						formFieldHtml += '</form>';
						formFieldHtml += '</div>';
						formIdCorrect = true;
					}
					formBox.innerHTML=formFieldHtml;
					formBox.setAttribute("data-customer", "");
					formBox.setAttribute("data-shop", "");
					var formBoxSubmit = formBox.querySelectorAll(".onst-custom-form-submit");
					var formBoxGroupButton = formBox.querySelectorAll(".onst-custom-form-group");
					var customFormStepButtons = formBox.querySelectorAll('.onst-custom-form-step');
					var customFormStepPrevButtons = formBox.querySelectorAll('.onst-custom-form-prev-step');
					
					formBoxGroupButton.forEach(formGroupButton => {
						formGroupButton.addEventListener('click', function (selector) {
							formGroupFunction(selector.target);
						});
					});

					formBoxSubmit.forEach(formBoxSubmitButton => {
						formBoxSubmitButton.addEventListener('click', function (selector) {
							formSubmitFunction(selector.target.closest(".onst-custom-form-submit"));
						});
					});

					formBox.addEventListener('change', function (e) {
						if (e.target.matches('input[type="file"]')) {
							formFieldUploadFunction(e.target);
						}
					});

					if (customFormStepPrevButtons.length > 0) {
						customFormStepPrevButtons.forEach(customFormStepButton => {
							customFormStepButton.addEventListener('click', function (e) {
								e.preventDefault();
								var targetElement = e.target;
								var dataStep = targetElement.getAttribute('data-step');
								var dataStepInc = parseInt(dataStep)-1;
								backStep(dataStepInc, targetElement);
							});
						});
					}

					if (customFormStepButtons.length > 0) {
						customFormStepButtons.forEach(customFormStepButton => {
							customFormStepButton.addEventListener('click', function (e) {
								var targetElement = e.target;
								var dataStep = targetElement.getAttribute('data-step');
								var stepClear = checkStep(dataStep, targetElement);
								var dataStepInc = parseInt(dataStep)+1;
								if( stepClear == 0 ){
									var formElement = targetElement.closest('form');
									var allFields = formElement.querySelectorAll('.onst-field');
									var allFieldsGroup = formElement.querySelectorAll('.onst-field-group-box');
									var finalStep = formElement.querySelectorAll('.final-step');
									allFields.forEach(allField => {
										allField.classList.remove('step-active');
									});
									allFieldsGroup.forEach(allField => {
										allField.classList.remove('step-active');
									});
									finalStep.forEach(allField => {
										allField.classList.remove('step-active');
									});
									allFields.forEach(allField => {
										if( allField.getAttribute('data-step') == dataStepInc ){
											allField.classList.add('step-active');
										}
									});
									allFieldsGroup.forEach(allField => {
										if( allField.getAttribute('data-step') == dataStepInc ){
											allField.classList.add('step-active');
										}
									});
									finalStep.forEach(allField => {
										if( allField.getAttribute('data-step') == dataStepInc ){
											allField.classList.add('step-active');
										}
									});
									formElement.scrollIntoView({
										behavior: 'smooth',
										block: 'start'
									});
								}
							});
						});
					}
					
					formBox.addEventListener('click', function (e) {

						var viewButton = e.target.closest('.password-view-js');
						if (!viewButton) return;

						var fieldBox = viewButton.closest('.onst-password-field');
						var inputView = fieldBox.querySelectorAll('input');

						inputView.forEach(function(inputViewEl){
							if (inputViewEl.type === 'password') {
								inputViewEl.type = 'text';
							} else {
								inputViewEl.type = 'password';
							}
						});

					});
					
					formBox.addEventListener('click', function (e) {

						var removeButton = e.target.closest('.remove-group-title');
						if (!removeButton) return;
						e.preventDefault();
						e.target.closest('.onst-field-group-box').remove();

					});

					if( dynamicConditions.length > 0 ){
						dynamicConditions.forEach(dynamicCond => {
							document.querySelectorAll(`[name="${dynamicCond.dynamicname}"]`).forEach(element => {
								const updateFields = (event) => {
									var changeValue = element.value;
									if (event && (event.target.type === 'checkbox' || event.target.type === 'radio')) {
										changeValue = '';
										if( event.target.type === 'checkbox' ){
											var checkCount = 0;
											document.querySelectorAll(`[name="${dynamicCond.dynamicname}"]`).forEach(nelement => {
												if( nelement.type == 'checkbox' ){
													if( nelement.checked ){
														if( checkCount == 0 ){
															changeValue += nelement.value;
														}else{
															changeValue += ','+nelement.value;
														}
														checkCount=checkCount+1
													}
												}
											})
										}else{
											if( event.target.checked ){
												changeValue = event.target.value;
											}
										}
									}
									if( dynamicCond.type == 'title' || dynamicCond.type == 'description' ){
										var actionFields = document.querySelectorAll(`[data-name="${dynamicCond.name}"]`);
									}else{
										var actionFields = document.querySelectorAll(`[name="${dynamicCond.name}"]`);
									}
									if (actionFields.length > 0) {
										actionFields.forEach(actionField => {
											var action = '';
											if (dynamicCond.dynamiccondition === "equal") {
												if (changeValue == dynamicCond.dynamicvalue) {
													action = dynamicCond.dynamicaction === "hide" ? "hide" : "show";
												} else {
													action = dynamicCond.dynamicaction === "hide" ? "show" : "hide";
												}
											}
											if (dynamicCond.dynamiccondition === "notequal") {
												if (changeValue !== dynamicCond.dynamicvalue) {
													action = dynamicCond.dynamicaction === "hide" ? "hide" : "show";
												} else {
													action = dynamicCond.dynamicaction === "hide" ? "show" : "hide";
												}
											}
											if (dynamicCond.dynamiccondition === "contain") {
												if (changeValue.indexOf(dynamicCond.dynamicvalue) !== -1) {
													action = dynamicCond.dynamicaction === "hide" ? "hide" : "show";
												} else {
													action = dynamicCond.dynamicaction === "hide" ? "show" : "hide";
												}
											}
											if (dynamicCond.dynamiccondition === "notcontain") {
												if (changeValue.indexOf(dynamicCond.dynamicvalue) == -1) {
													action = dynamicCond.dynamicaction === "hide" ? "hide" : "show";
												} else {
													action = dynamicCond.dynamicaction === "hide" ? "show" : "hide";
												}
											}
											let fieldContainer = actionField.closest('.onst-field');
											if (fieldContainer) {
												if (action === "hide") {
													fieldContainer.classList.add('hidden-onst');
													actionField.setAttribute('data-required', false);
													if( fieldContainer.querySelector('input[type="file"]') ){
														fieldContainer.querySelector('input[type="file"]').value ="";
														fieldContainer.querySelector('input[type="file"]').setAttribute('data-required', false);
													}
													let warningElement = fieldContainer.querySelector('.onst-warning');
													if (warningElement) {
														warningElement.classList.remove('onstactive');
													}
													if (actionField.tagName === "SELECT") {
														actionField.selectedIndex = 0; // Select first option
													} else if (actionField.type === "radio" || actionField.type === "checkbox") {
														actionField.checked = false; // Uncheck
													} else if (["text", "email", "number", "textarea", "tel", "password", "date", "email","hidden"].includes(actionField.type)) {
														actionField.value = ""; // Clear input value
													} else if (actionField.tagName === "TEXTAREA") {
														actionField.value = ""; // Clear textarea content
													}else{
													}
													const changeEvent = new Event('change');
													actionField.dispatchEvent(changeEvent);
												} else if (action === "show") {
													fieldContainer.classList.remove('hidden-onst');
													actionField.setAttribute('data-required', !!dynamicCond.require);
													if( fieldContainer.querySelector('input[type="file"]') ){
														fieldContainer.querySelector('input[type="file"]').value ="";
														fieldContainer.querySelector('input[type="file"]').setAttribute('data-required', !!dynamicCond.require);
													}
												}
											}
										});
									}
								};
						
								// Attach event listeners
								["change", "input", "keyup", "keypress"].forEach(eventType => {
									element.addEventListener(eventType, updateFields);
								});
						
								// Trigger the function on initial load
								updateFields({ target: element });
							});
						});
					}

				}
			}
		}
		if( formIdCorrect == false ){
			var formFieldHtml = '';
			formFieldHtml += '<div class="onst-registration-form-error-box SureCust-App">';
				formFieldHtml += '<p>Please provide the correct Form ID under the customization area of the theme.</p>';
			formFieldHtml += '</div>';
			formBox.innerHTML='';
			formBox.innerHTML=formFieldHtml;
		}
	}
	
	function processNextForm(shopUrl, customerId) {
        if (formsQueue.length > 0) {
			var formBox = formsQueue.shift();
			var shop = formBox.getAttribute('data-shop');
			var formId = formBox.getAttribute('data-id');
			if( formId !== '' && customerId !== '' && shop !== '' ){
				var country_state_js_input = formBox.querySelectorAll(".country_state_js");
				for (let i = 0; i < country_state_js_input.length; i++) {
					country_state_js_url = country_state_js_input[i].value;
				}
				var product_id_title = formBox.querySelectorAll(".product_id_title");
				var productId = '';
				var productTitle = '';
				for (let i = 0; i < product_id_title.length; i++) {
					productId = product_id_title[i].getAttribute('data-id');
					productTitle = product_id_title[i].getAttribute('data-title');
				}
				var form_data_metafield = formBox.querySelectorAll(".form_data_metafield");
				var formdataJson = '';
				for (let i = 0; i < form_data_metafield.length; i++) {
					formdataJson = form_data_metafield[i].getAttribute('data-value');
				}
				if( formdataJson !== '' ){
					console.log('SureCust-form');
					var formdataJson = formdataJson.replace(/&#39;/g, "'");
					var data = JSON.parse(formdataJson);
					formCreation(formBox, data, customerId, shop, formId, productId, productTitle);
					processNextForm(shopUrl, customerId);
				}else{
					console.log('SureCust-Form');
					var postData = {
						form:formId,
						customer:customerId,
						shop:shop
					}
					fetch(appurl+'/api/customformfetch',{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json', // Set the content type to JSON
						},
						body: JSON.stringify(postData), // Convert the data to JSON format
					}).then(response => {
						// Check if the request was successful
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						// Parse the response as JSON and return it
						return response.json();
					}).then(data => {
						formCreation(formBox, data, customerId, shop, formId, productId, productTitle);
					}).catch(error => {
						// Handle errors
						console.log(error);
						//alert("Something went wrong, Please try after reload");
						//location.reload();
					}).finally(() => {
						processNextForm(shopUrl, customerId); // Process next form after current form is processed
					});
				}
			}else{
				var formFieldHtml = '';
				formFieldHtml += '<div class="onst-registration-form-error-box SureCust-App">';
					formFieldHtml += '<p>Please provide the correct Form ID under the customization area of the theme.</p>';
				formFieldHtml += '</div>';
				formBox.innerHTML='';
				formBox.innerHTML=formFieldHtml;
			}
		}else{		
			runAfterFormsRender(country_state, country_state_js_url, shopUrl, customerId);
		}
	}
	
	function runAfterFormsRender(has_country, js_url, shop, customerId) {

		if( has_country > 0 ){
			if( country_state_js_url !== '' ){
				const script = document.createElement('script');
				script.src = js_url;
				script.async = true;
				document.body.appendChild(script);
			}
		}
		
		if( shop == 'honma-koinu.myshopify.com' || shop == 'bioskin-tpy.myshopify.com' || shop == 'bioskin-luxe-clinic.myshopify.com' || shop == 'synthesis-organics-wholesale.myshopify.com' || shop == 'px0h65-0y.myshopify.com' ){}else{
			const phoneInputsBox = document.querySelectorAll('.onst-registration-form-container-box');
			phoneInputsBox.forEach(inputBox => {
				const phoneInputs = inputBox.querySelectorAll('input[type="tel"]');
				phoneInputs.forEach(input => {
					// Skip if already wrapped
					if (input.closest('.phone-input-wrapper')) return;

					if( input.getAttribute('data-suggession') == 'false' )return;

					var defaultValue = input.getAttribute('data-default');
					// Create wrapper
					const wrapper = document.createElement('div');
					wrapper.className = 'surecust-phone-input-wrapper';
					wrapper.style.display = 'flex';
					wrapper.style.alignItems = 'center';
					wrapper.style.gap = '8px';

					// Create select
					const select = document.createElement('select');
					select.style.width = '105px';
					var countries = [
						{ name: "Afghanistan", code: "AF", dial: "+93", flag: "🇦🇫" },
						{ name: "Albania", code: "AL", dial: "+355", flag: "🇦🇱" },
						{ name: "Algeria", code: "DZ", dial: "+213", flag: "🇩🇿" },
						{ name: "Andorra", code: "AD", dial: "+376", flag: "🇦🇩" },
						{ name: "Angola", code: "AO", dial: "+244", flag: "🇦🇴" },
						{ name: "Argentina", code: "AR", dial: "+54", flag: "🇦🇷" },
						{ name: "Armenia", code: "AM", dial: "+374", flag: "🇦🇲" },
						{ name: "Australia", code: "AU", dial: "+61", flag: "🇦🇺" },
						{ name: "Austria", code: "AT", dial: "+43", flag: "🇦🇹" },
						{ name: "Azerbaijan", code: "AZ", dial: "+994", flag: "🇦🇿" },
						{ name: "Bahamas", code: "BS", dial: "+1-242", flag: "🇧🇸" },
						{ name: "Bahrain", code: "BH", dial: "+973", flag: "🇧🇭" },
						{ name: "Bangladesh", code: "BD", dial: "+880", flag: "🇧🇩" },
						{ name: "Barbados", code: "BB", dial: "+1-246", flag: "🇧🇧" },
						{ name: "Belarus", code: "BY", dial: "+375", flag: "🇧🇾" },
						{ name: "Belgium", code: "BE", dial: "+32", flag: "🇧🇪" },
						{ name: "Belize", code: "BZ", dial: "+501", flag: "🇧🇿" },
						{ name: "Benin", code: "BJ", dial: "+229", flag: "🇧🇯" },
						{ name: "Bhutan", code: "BT", dial: "+975", flag: "🇧🇹" },
						{ name: "Bolivia", code: "BO", dial: "+591", flag: "🇧🇴" },
						{ name: "Bosnia and Herzegovina", code: "BA", dial: "+387", flag: "🇧🇦" },
						{ name: "Botswana", code: "BW", dial: "+267", flag: "🇧🇼" },
						{ name: "Brazil", code: "BR", dial: "+55", flag: "🇧🇷" },
						{ name: "Brunei", code: "BN", dial: "+673", flag: "🇧🇳" },
						{ name: "Bulgaria", code: "BG", dial: "+359", flag: "🇧🇬" },
						{ name: "Burkina Faso", code: "BF", dial: "+226", flag: "🇧🇫" },
						{ name: "Burundi", code: "BI", dial: "+257", flag: "🇧🇮" },
						{ name: "Cambodia", code: "KH", dial: "+855", flag: "🇰🇭" },
						{ name: "Cameroon", code: "CM", dial: "+237", flag: "🇨🇲" },
						{ name: "Canada", code: "CA", dial: "+1", flag: "🇨🇦" },
						{ name: "Cape Verde", code: "CV", dial: "+238", flag: "🇨🇻" },
						{ name: "Central African Republic", code: "CF", dial: "+236", flag: "🇨🇫" },
						{ name: "Chad", code: "TD", dial: "+235", flag: "🇹🇩" },
						{ name: "Chile", code: "CL", dial: "+56", flag: "🇨🇱" },
						{ name: "China", code: "CN", dial: "+86", flag: "🇨🇳" },
						{ name: "Colombia", code: "CO", dial: "+57", flag: "🇨🇴" },
						{ name: "Comoros", code: "KM", dial: "+269", flag: "🇰🇲" },
						{ name: "Congo", code: "CG", dial: "+242", flag: "🇨🇬" },
						{ name: "Costa Rica", code: "CR", dial: "+506", flag: "🇨🇷" },
						{ name: "Croatia", code: "HR", dial: "+385", flag: "🇭🇷" },
						{ name: "Cuba", code: "CU", dial: "+53", flag: "🇨🇺" },
						{ name: "Cyprus", code: "CY", dial: "+357", flag: "🇨🇾" },
						{ name: "Czech Republic", code: "CZ", dial: "+420", flag: "🇨🇿" },
						{ name: "Denmark", code: "DK", dial: "+45", flag: "🇩🇰" },
						{ name: "Dominican Republic", code: "DO", dial: "+1-809", flag: "🇩🇴" },
						{ name: "Ecuador", code: "EC", dial: "+593", flag: "🇪🇨" },
						{ name: "Egypt", code: "EG", dial: "+20", flag: "🇪🇬" },
						{ name: "El Salvador", code: "SV", dial: "+503", flag: "🇸🇻" },
						{ name: "Estonia", code: "EE", dial: "+372", flag: "🇪🇪" },
						{ name: "Ethiopia", code: "ET", dial: "+251", flag: "🇪🇹" },
						{ name: "Fiji", code: "FJ", dial: "+679", flag: "🇫🇯" },
						{ name: "Finland", code: "FI", dial: "+358", flag: "🇫🇮" },
						{ name: "France", code: "FR", dial: "+33", flag: "🇫🇷" },
						{ name: "Germany", code: "DE", dial: "+49", flag: "🇩🇪" },
						{ name: "Ghana", code: "GH", dial: "+233", flag: "🇬🇭" },
						{ name: "Greece", code: "GR", dial: "+30", flag: "🇬🇷" },
						{ name: "Greenland", code: "GL", dial: "+299", flag: "🇬🇱" },
						{ name: "Guatemala", code: "GT", dial: "+502", flag: "🇬🇹" },
						{ name: "Honduras", code: "HN", dial: "+504", flag: "🇭🇳" },
						{ name: "Hong Kong", code: "HK", dial: "+852", flag: "🇭🇰" },
						{ name: "Hungary", code: "HU", dial: "+36", flag: "🇭🇺" },
						{ name: "Iceland", code: "IS", dial: "+354", flag: "🇮🇸" },
						{ name: "India", code: "IN", dial: "+91", flag: "🇮🇳" },
						{ name: "Indonesia", code: "ID", dial: "+62", flag: "🇮🇩" },
						{ name: "Iran", code: "IR", dial: "+98", flag: "🇮🇷" },
						{ name: "Iraq", code: "IQ", dial: "+964", flag: "🇮🇶" },
						{ name: "Ireland", code: "IE", dial: "+353", flag: "🇮🇪" },
						{ name: "Israel", code: "IL", dial: "+972", flag: "🇮🇱" },
						{ name: "Italy", code: "IT", dial: "+39", flag: "🇮🇹" },
						{ name: "Jamaica", code: "JM", dial: "+1-876", flag: "🇯🇲" },
						{ name: "Japan", code: "JP", dial: "+81", flag: "🇯🇵" },
						{ name: "Jordan", code: "JO", dial: "+962", flag: "🇯🇴" },
						{ name: "Kazakhstan", code: "KZ", dial: "+7", flag: "🇰🇿" },
						{ name: "Kenya", code: "KE", dial: "+254", flag: "🇰🇪" },
						{ name: "Kuwait", code: "KW", dial: "+965", flag: "🇰🇼" },
						{ name: "Laos", code: "LA", dial: "+856", flag: "🇱🇦" },
						{ name: "Latvia", code: "LV", dial: "+371", flag: "🇱🇻" },
						{ name: "Lebanon", code: "LB", dial: "+961", flag: "🇱🇧" },
						{ name: "Liberia", code: "LR", dial: "+231", flag: "🇱🇷" },
						{ name: "Libya", code: "LY", dial: "+218", flag: "🇱🇾" },
						{ name: "Lithuania", code: "LT", dial: "+370", flag: "🇱🇹" },
						{ name: "Luxembourg", code: "LU", dial: "+352", flag: "🇱🇺" },
						{ name: "Madagascar", code: "MG", dial: "+261", flag: "🇲🇬" },
						{ name: "Malaysia", code: "MY", dial: "+60", flag: "🇲🇾" },
						{ name: "Maldives", code: "MV", dial: "+960", flag: "🇲🇻" },
						{ name: "Mali", code: "ML", dial: "+223", flag: "🇲🇱" },
						{ name: "Malta", code: "MT", dial: "+356", flag: "🇲🇹" },
						{ name: "Mexico", code: "MX", dial: "+52", flag: "🇲🇽" },
						{ name: "Monaco", code: "MC", dial: "+377", flag: "🇲🇨" },
						{ name: "Mongolia", code: "MN", dial: "+976", flag: "🇲🇳" },
						{ name: "Morocco", code: "MA", dial: "+212", flag: "🇲🇦" },
						{ name: "Mozambique", code: "MZ", dial: "+258", flag: "🇲🇿" },
						{ name: "Myanmar", code: "MM", dial: "+95", flag: "🇲🇲" },
						{ name: "Namibia", code: "NA", dial: "+264", flag: "🇳🇦" },
						{ name: "Nepal", code: "NP", dial: "+977", flag: "🇳🇵" },
						{ name: "Netherlands", code: "NL", dial: "+31", flag: "🇳🇱" },
						{ name: "New Zealand", code: "NZ", dial: "+64", flag: "🇳🇿" },
						{ name: "Nigeria", code: "NG", dial: "+234", flag: "🇳🇬" },
						{ name: "Norway", code: "NO", dial: "+47", flag: "🇳🇴" },
						{ name: "Oman", code: "OM", dial: "+968", flag: "🇴🇲" },
						{ name: "Pakistan", code: "PK", dial: "+92", flag: "🇵🇰" },
						{ name: "Palestine", code: "PS", dial: "+970", flag: "🇵🇸" },
						{ name: "Panama", code: "PA", dial: "+507", flag: "🇵🇦" },
						{ name: "Papua New Guinea", code: "PG", dial: "+675", flag: "🇵🇬" },
						{ name: "Paraguay", code: "PY", dial: "+595", flag: "🇵🇾" },
						{ name: "Peru", code: "PE", dial: "+51", flag: "🇵🇪" },
						{ name: "Philippines", code: "PH", dial: "+63", flag: "🇵🇭" },
						{ name: "Poland", code: "PL", dial: "+48", flag: "🇵🇱" },
						{ name: "Portugal", code: "PT", dial: "+351", flag: "🇵🇹" },
						{ name: "Qatar", code: "QA", dial: "+974", flag: "🇶🇦" },
						{ name: "Romania", code: "RO", dial: "+40", flag: "🇷🇴" },
						{ name: "Russia", code: "RU", dial: "+7", flag: "🇷🇺" },
						{ name: "Rwanda", code: "RW", dial: "+250", flag: "🇷🇼" },
						{ name: "Saudi Arabia", code: "SA", dial: "+966", flag: "🇸🇦" },
						{ name: "Senegal", code: "SN", dial: "+221", flag: "🇸🇳" },
						{ name: "Serbia", code: "RS", dial: "+381", flag: "🇷🇸" },
						{ name: "Singapore", code: "SG", dial: "+65", flag: "🇸🇬" },
						{ name: "Slovakia", code: "SK", dial: "+421", flag: "🇸🇰" },
						{ name: "Slovenia", code: "SI", dial: "+386", flag: "🇸🇮" },
						{ name: "South Africa", code: "ZA", dial: "+27", flag: "🇿🇦" },
						{ name: "South Korea", code: "KR", dial: "+82", flag: "🇰🇷" },
						{ name: "Spain", code: "ES", dial: "+34", flag: "🇪🇸" },
						{ name: "Sri Lanka", code: "LK", dial: "+94", flag: "🇱🇰" },
						{ name: "Sweden", code: "SE", dial: "+46", flag: "🇸🇪" },
						{ name: "Switzerland", code: "CH", dial: "+41", flag: "🇨🇭" },
						{ name: "Taiwan", code: "TW", dial: "+886", flag: "🇹🇼" },
						{ name: "Tanzania", code: "TZ", dial: "+255", flag: "🇹🇿" },
						{ name: "Thailand", code: "TH", dial: "+66", flag: "🇹🇭" },
						{ name: "Turkey", code: "TR", dial: "+90", flag: "🇹🇷" },
						{ name: "Uganda", code: "UG", dial: "+256", flag: "🇺🇬" },
						{ name: "Ukraine", code: "UA", dial: "+380", flag: "🇺🇦" },
						{ name: "United Arab Emirates", code: "AE", dial: "+971", flag: "🇦🇪" },
						{ name: "United Kingdom", code: "GB", dial: "+44", flag: "🇬🇧" },
						{ name: "United States", code: "US", dial: "+1", flag: "🇺🇸" },
						{ name: "Uruguay", code: "UY", dial: "+598", flag: "🇺🇾" },
						{ name: "Uzbekistan", code: "UZ", dial: "+998", flag: "🇺🇿" },
						{ name: "Venezuela", code: "VE", dial: "+58", flag: "🇻🇪" },
						{ name: "Vietnam", code: "VN", dial: "+84", flag: "🇻🇳" },
						{ name: "Zambia", code: "ZM", dial: "+260", flag: "🇿🇲" },
						{ name: "Zimbabwe", code: "ZW", dial: "+263", flag: "🇿🇼" },
					];

					// Populate select options
					countries.forEach(country => {
						const opt = document.createElement('option');
						opt.value = country.dial;
						opt.textContent = `${country.flag} (${country.dial})`;
						if( shop == '3a9e68-61.myshopify.com' ){
							if (country.code === 'CA') opt.selected = true;
						}else{
							if( shop == '12b3px-ib.myshopify.com' || shop == '68fcqz-19.myshopify.com' ){
								if (country.code === 'GB') opt.selected = true;
							}else{
								if( shop == 'aja-jewel.myshopify.com' ){
									if (country.code === 'TR') opt.selected = true;
								}else{
									if( shop == 'tzeny0-cu.myshopify.com' ){
										if (country.code === 'IN') opt.selected = true;
									}else{
										if( shop == 'cosertyb2b.myshopify.com' ){
											if (country.code === 'ES') opt.selected = true;
										}else{
											if (country.dial === defaultValue) opt.selected = true;
										}
									}
								}
							}
						}

						select.appendChild(opt);
					});

					// Insert wrapper around input
					input.parentNode.insertBefore(wrapper, input);
					wrapper.appendChild(select);
					wrapper.appendChild(input);

					document.querySelectorAll('.surecust-phone-input-wrapper').forEach(initPhoneField);

				});
			});
		}
		

		// captchaElementId => widgetId
		var recaptchaLoaded = false;
		var recaptchaEnabled = false;

		var recaptchaV2Enabled = false;
		var recaptchaV3Enabled = false;

		var recaptchaV2SiteKey = null;
		var recaptchaV3SiteKey = null;

		var captchaCount = 0;

		/* -------------------------------
			STEP 1: FIND FORMS + ADD CAPTCHA BOX
		-------------------------------- */
		var formSubmitButtons = document.querySelectorAll('.onst-custom-form-submit');

		if (formSubmitButtons.length > 0) {
			formSubmitButtons.forEach(function (subBtn) {

				var securityEnabled = subBtn.getAttribute('data-security') === 'true';
				if (!securityEnabled) return;

				var closestForm = subBtn.closest('form');
				if (!closestForm) return;


				var captchaBlockId = 'surerecaptcha-' + captchaCount;
				var captchaScore = closestForm.querySelector('.recaptcha-score');
				// Prevent duplicate captcha on same form
				if (closestForm.querySelector('.recaptcha-box')){
					closestForm.querySelector('.recaptcha-box').setAttribute('id', captchaBlockId);

					//recaptchaEnabled = true;
					recaptchaV2Enabled = true;

					// Store captcha element ID on form
					closestForm.dataset.recaptchaId = captchaBlockId;
					closestForm.dataset.recaptchaVersion = 'v2';

					captchaCount++;
				} else if (captchaScore) {

					closestForm.dataset.recaptchaVersion = 'v3';
					recaptchaV3Enabled = true;
				}

			});
		}

		function disableAllRecaptchaForms(formSubmitButtons) {

			formSubmitButtons.forEach(function (subBtn) {

				subBtn.setAttribute(
					'data-security',
					'false'
				);

			});
		}
		function disableRecaptchaVersion(version) {
			document.querySelectorAll(
				'form.onst-custom-form'
			).forEach(function (form) {

				if (
					form.dataset.recaptchaVersion === version
				) {

					var submitBtn =
						form.querySelector(
							'.onst-custom-form-submit'
						);

					if (submitBtn) {

						submitBtn.setAttribute(
							'data-security',
							'false'
						);
					}
				}

			});
		}

		if ( (recaptchaV2Enabled || recaptchaV3Enabled) && typeof customerId !== 'undefined' && customerId !== '' ) {

			fetch(appurl + '/api/customformrecaptch', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					shop: shop,
					customer: customerId
				})
			})

			.then(function (res) {
				return res.json();
			})

			.then(function (data) {

				if (!data.status) {
					disableAllRecaptchaForms(formSubmitButtons);
					return;
				}
				/*
				* -------------------------
				* v2 configuration
				* -------------------------
				*/
				if ( recaptchaV2Enabled && data.v2 && data.v2.working && data.v2.api ) {

					recaptchaV2SiteKey = data.v2.api;

				} else if (recaptchaV2Enabled) {

					disableRecaptchaVersion('v2');
				}


				/*
				* -------------------------
				* v3 configuration
				* -------------------------
				*/
				if ( recaptchaV3Enabled && data.v3 && data.v3.working && data.v3.api ) {

					recaptchaV3SiteKey = data.v3.api;

				} else if (recaptchaV3Enabled) {

					disableRecaptchaVersion('v3');
				}


				/*
				* Load Google API if at least
				* one version is available
				*/
				if (
					recaptchaV2SiteKey ||
					recaptchaV3SiteKey
				) {

					loadRecaptchaOnce();

				} else {
					disableAllRecaptchaForms(formSubmitButtons);
				}

			})

			.catch(function (err) {

				disableAllRecaptchaForms(formSubmitButtons);

				console.error(
					'Recaptcha fetch failed:',
					err
				);
			});
		}

		window.onloadSureCallback = function () {

			/*
			* Only v2 needs rendering.
			*/

			if (recaptchaV2SiteKey) {

				renderAllRecaptchas(
					recaptchaV2SiteKey
				);
			}

		};

		function loadRecaptchaOnce() {

			if (recaptchaLoaded) {
				return;
			}

			recaptchaLoaded = true;

			/*
			* Store keys globally
			*/
			window.__sureV2SiteKey =
				recaptchaV2SiteKey;

			window.__sureV3SiteKey =
				recaptchaV3SiteKey;

			/*
			* Load Google reCAPTCHA API
			*
			* render=V3_KEY allows v3 execution.
			* v2 can still be rendered explicitly.
			*/
			var script = document.createElement('script');

			if (recaptchaV3SiteKey) {
				script.src =
					'https://www.google.com/recaptcha/api.js' +
					'?onload=onloadSureCallback' +
					'&render=' +
					encodeURIComponent(
						recaptchaV3SiteKey
					);

			} else {
				script.src =
					'https://www.google.com/recaptcha/api.js' +
					'?onload=onloadSureCallback' +
					'&render=explicit';
			}

			script.async = true;
			script.defer = true;

			document.body.appendChild(script);
		}

	}
	
	function formGroupFunction(target){
		var targetButton = target;
		var removeText = targetButton.getAttribute('data-remove');
		var targetButtonBox = targetButton.closest('.onst-field');
		var formElement = target.closest('form');
		var groupBoxAll = formElement.querySelectorAll('.onst-field-group-box');
		var groupBoxLength = groupBoxAll.length;
		if( groupBoxLength > 0 ){
			var nextGroup = parseInt(groupBoxLength)+1;
			var copyElemnt = groupBoxAll[0].cloneNode(true);

			var originalWrappers = groupBoxAll[0].querySelectorAll('.surecust-phone-input-wrapper');
			var clonedWrappers = copyElemnt.querySelectorAll('.surecust-phone-input-wrapper');

			originalWrappers.forEach((wrapper, index) => {

				var originalSelect = wrapper.querySelector('select');
				var clonedSelect = clonedWrappers[index].querySelector('select');

				if (originalSelect && clonedSelect) {

					var selectedOption = originalSelect.options[originalSelect.selectedIndex];
					var selectedValue = selectedOption.value;
					var selectedText = selectedOption.text;

					Array.from(clonedSelect.options).forEach(function(option){
						if (option.value === selectedValue && option.text === selectedText) {
							option.selected = true;
						}
					});

				}

			});

			copyElemnt.querySelectorAll('.surecust-phone-input-wrapper').forEach(initPhoneField);

			var groupCount = copyElemnt.querySelector('.group-count');
			if( groupCount ){
				groupCount.innerText="#"+nextGroup;
			}
			var groupTitle = copyElemnt.querySelector('.group-field-title');
			if( groupTitle ){
				 var link = document.createElement('a');
					link.href = "#"; // set your URL
					link.className = "remove-group-title";
					link.textContent = removeText; // anchor text
					groupTitle.appendChild(link);
			}
			var allLabels = copyElemnt.querySelectorAll('label');
			allLabels.forEach(allLabel => {
				var checkFor = allLabel.getAttribute('for');
				if( checkFor && checkFor !== null && checkFor !== '' ){
					var newFor = nextGroup+'-'+checkFor;
					allLabel.setAttribute('for', newFor);
				}
			});
			var allFields = copyElemnt.querySelectorAll('input, textarea, select');

			allFields.forEach(field => {

				var id = field.getAttribute('id');
				if (id) {
					field.setAttribute('id', nextGroup + '-' + id);
				}

				var name = field.getAttribute('name');
				if (name) {
					field.setAttribute('name', nextGroup + '-' + name);
				}

			});

			targetButtonBox.insertAdjacentElement('beforebegin', copyElemnt);
		}
	}
	function formSubmitFunction(target){
		var targetButton = target;
		if( targetButton.classList.contains('uploading-file') ){
			return;
		}
		var formElement = target.closest('form');
		formElement.classList.add('Submitting');
		var required = 0;
		var targetButtonType = targetButton.getAttribute('data-type');
		var targetButtonSType = targetButton.getAttribute('data-security');
		var targetFormType = formElement.getAttribute('data-type');
		var emailwarning = formElement.querySelectorAll('.customer-email-onst');
		var formInputs = formElement.querySelectorAll("input");
		var formSelects = formElement.querySelectorAll("select");
		var formTextareas = formElement.querySelectorAll("textarea");
		var formInputWarning = formElement.querySelectorAll(".onst-warning");
		var successmessage = formElement.querySelectorAll(".onst-success-message");
		successmessage.forEach(successmessageE => {
			successmessageE.classList.remove('onstactive');
		});
		formInputWarning.forEach(warningElement => {
			warningElement.classList.remove('onstactive');
		});
		var checkWorkEmail = false;
		var checkNameValidation = false;
		var shopDomain = '';
		var checkAge = false;
		var checkPhone = false;
		var checkUSPhone = false;
		var checkINPhone = false;
		var checkComEmail = false;

		formInputs.forEach(formInput => {
			var checkData = formInput.getAttribute('data-required');
			var checkType = formInput.getAttribute('type');
			var checkName = formInput.getAttribute('name');

			if( checkName ){
				if( checkName == 'wcustomer[shop]' ){
					if( formInput.value == 'specialneedscomputers.myshopify.com' ){
						checkNameValidation = true;
					}
					if( formInput.value == '1a-blueten.myshopify.com' ){
						checkAge = true;
					}
					if( formInput.value == 'nwsbsx-1m.myshopify.com' ){
						checkPhone = true;
					}
					if( formInput.value == 'manicaretti-us.myshopify.com' ){
						checkUSPhone = true;
					}
					if( formInput.value == 'foodsquare-f57vsd8j.myshopify.com' ){
						checkINPhone = true;
						checkComEmail = true;
					}
					shopDomain = formInput.value;
				}
			}
			 
			var validDomainExtensions = [
				// Popular generic extensions
				".com", ".net", ".org", ".info", ".biz", ".name", ".pro",
				".xyz", ".online", ".site", ".website", ".store", ".shop",
				".tech", ".app", ".dev", ".cloud", ".digital", ".agency",
				".company", ".solutions", ".services", ".global", ".world",
				".space", ".life", ".live", ".blog", ".news", ".email",
				".today", ".center", ".systems", ".network", ".social",
				".media", ".software", ".technology",

				// Business and e-commerce
				".business", ".consulting", ".marketing", ".finance",
				".accountant", ".accountants", ".management", ".ventures",
				".limited", ".partners", ".support", ".sale", ".deals",
				".market", ".shopping", ".boutique", ".fashion", ".clothing",
				".restaurant", ".cafe", ".bar",

				// Technology and developers
				".ai", ".io", ".co", ".me", ".sh", ".codes", ".coding",
				".computer", ".engineering", ".data", ".api", ".host",
				".hosting", ".security",

				// Country-specific extensions
				".in", ".us", ".uk", ".co.uk", ".ca", ".au", ".de",
				".fr", ".jp", ".cn", ".br", ".nz", ".sg", ".ae",
				".za", ".ru", ".es", ".it",

				// Education and organizations
				".edu", ".school", ".university", ".college", ".academy",
				".training", ".institute", ".education", ".foundation",
				".ngo", ".charity",

				// Other extensions
				".art", ".design", ".photography", ".pictures", ".video",
				".music", ".games", ".game", ".fitness", ".health", ".care",
				".travel", ".hotel", ".events", ".tickets", ".family",
				".kids", ".fun", ".club", ".team", ".zone", ".expert",
				".guide"
			];

			if( checkComEmail ){
				var validDomainExtensions = [
					".com"
				];
			}

			if( checkData == 'true' ){
				if( checkType == 'radio' || checkType == 'checkbox' ){
					var getName = formInput.getAttribute('name');
					if( checkType == 'checkbox' ){
						var checkboxes = formElement.elements[getName];
						var checkedValues = [];
						if (!checkboxes.length) {
						  checkboxes = [checkboxes];
						}
						for (var i = 0; i < checkboxes.length; i++) {
						  // Check if the checkbox is checked
						  if (checkboxes[i].checked) {
							// If checked, add its value to the array of checked values
							checkedValues.push(checkboxes[i].value);
						  }
						}
						if( checkedValues.length > 0 ){}else{
							required = 1;
							var formRadioBox = formInput.closest('.onst-field');
							var formRadioWarning = formRadioBox.querySelectorAll(".onst-warning");
							formRadioWarning.forEach(warningElement => {
								warningElement.classList.add('onstactive');
							});
						}
					}else{
						var radioFieldValue = formElement.elements[getName].value;
						if( radioFieldValue !== '' ){}else{
							required = 1;
							var formRadioBox = formInput.closest('.onst-field');
							var formRadioWarning = formRadioBox.querySelectorAll(".onst-warning");
							formRadioWarning.forEach(warningElement => {
								warningElement.classList.add('onstactive');
							});
						}
					}
				}else{
					if( formInput.value !== '' ){
						if( checkType == 'email' ){
							var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
							if (!emailRegex.test(formInput.value)) {
								required = 1;
								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
								formInputWarning.forEach(warningElement => {
									var warningText = warningElement.getAttribute('data-valid');
									warningElement.innerText=warningText;
									warningElement.classList.add('onstactive');
								});
							}else {
								var emailDomain = formInput.value.trim().toLowerCase().split("@")[1];

								var domainExtension = "." + emailDomain.split(".").pop();

								if (!validDomainExtensions.includes(domainExtension)) {
									required = 1;

									var formInputBox = formInput.closest('.onst-field');
									var formInputWarning = formInputBox.querySelectorAll(".onst-warning");

									formInputWarning.forEach(warningElement => {
										var warningText = warningElement.getAttribute('data-valid');
										warningElement.innerText = warningText;
										warningElement.classList.add('onstactive');
									});
								}
							}
						}
						if( checkNameValidation == true ){
							if( checkName == 'First Name' || checkName == 'Last Name' ){
								var nameFail = false;
								if (formInput.value.length > 10) {
									nameFail = true;
								}
								var capitals = formInput.value.match(/[A-Z]/g) || [];
								if (capitals.length > 3){
									nameFail = true;
								}
								if( nameFail == true ){
									required = 1;
									var formInputBox = formInput.closest('.onst-field');
									var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
									formInputWarning.forEach(warningElement => {
										var warningText = "Please enter a valid value (max 10 characters, max 3 capital letters).";
										warningElement.innerText=warningText;
										warningElement.classList.add('onstactive');
									});
								}
							}
						}
						if( checkAge == true ){
							if( checkName == 'Date Of Birth' ){
								var birthDate = new Date(formInput.value);
								var today = new Date();

								let age = today.getFullYear() - birthDate.getFullYear();
								var monthDifference = today.getMonth() - birthDate.getMonth();

								// Adjust age if birthday hasn't occurred yet this year
								if (
									monthDifference < 0 ||
									(monthDifference === 0 && today.getDate() < birthDate.getDate())
								) {
									age--;
								}
								if( age > 17 ){

								}else{
									required = 1;
									var formInputBox = formInput.closest('.onst-field');
									var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
									formInputWarning.forEach(warningElement => {
										warningElement.classList.add('onstactive');
									});
								}
							}
						}
						if( checkType == 'tel' ){
							var phoneValue = formInput.value.trim();

							// Allow only digits, spaces, +, -, (, )
							var validFormat = /^\+?[0-9\s().-]+$/.test(phoneValue);

							// Extract digits
							var cleanNumber = phoneValue.replace(/\D/g, "");

							// Validate
							if (
								!validFormat ||
								cleanNumber.length < 7 ||
								cleanNumber.length > 15
							) {
								required = 1;

								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");

								formInputWarning.forEach(warningElement => {
									warningElement.innerText = "Please enter a valid phone number.";
									warningElement.classList.add('onstactive');
								});
							}
						}

						if (checkUSPhone == true && checkType == 'tel') {

							var cleanNumber = formInput.value.replace(/\D/g, "");

							// Accept 10-digit US numbers or 11-digit numbers starting with 1
							if (cleanNumber.length === 11 && cleanNumber.startsWith("1")) {
								cleanNumber = cleanNumber.substring(1);
							}

							// US phone number validation
							var usPhoneRegex = /^[2-9]\d{2}[2-9]\d{6}$/;

							if (cleanNumber.length !== 10 || !usPhoneRegex.test(cleanNumber)) {

								required = 1;

								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");

								formInputWarning.forEach(warningElement => {
									warningElement.innerText = "Please enter a valid US phone number.";
									warningElement.classList.add('onstactive');
								});
							}
						}
						
						if (checkINPhone == true && checkType == 'tel') {
							var cleanNumber = formInput.value.replace(/\D/g, "");

							// Remove Indian country code (91)
							if (cleanNumber.length === 12 && cleanNumber.startsWith("91")) {
								cleanNumber = cleanNumber.substring(2);
							}
							var indianPhoneRegex = /^[6-9]\d{9}$/;

							if (cleanNumber.length !== 10 || !indianPhoneRegex.test(cleanNumber)) {

								required = 1;

								var formInputBox = formInput.closest('.onst-field');
								var formInputWarning = formInputBox.querySelectorAll(".onst-warning");

								formInputWarning.forEach(warningElement => {
									warningElement.innerText = "Please enter a valid Indian mobile number.";
									warningElement.classList.add('onstactive');
								});
							}
						}
					}else{
						if( checkType == 'email' ){
							required = 1;
							var formInputBox = formInput.closest('.onst-field');
							var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
							formInputWarning.forEach(warningElement => {
								var warningText = warningElement.getAttribute('data-required');
								warningElement.innerText=warningText;
								warningElement.classList.add('onstactive');
							});
						}else{
							required = 1;
							var formInputBox = formInput.closest('.onst-field');
							var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
							formInputWarning.forEach(warningElement => {
								warningElement.classList.add('onstactive');
							});
						}
					}
				}
			}
			if( checkName ){
				if( checkName.includes("surecust") ){
					if( formInput.value !== '' ){
						required = 1;
					}else{
						var checkTime = checkName;
						checkTimeString = checkTime.replace("surecust-", "");
						var suresubid = Date.now().toString(); 
						var diff = suresubid - checkTimeString;
						var seconds = diff / 1000;
						if( seconds > 5 ){}else{
							required = 1;
						}
					}
				}
				if( checkName == 'wcustomer[shop]' ){
					if( formInput.value == 'hpfqrt-1a.myshopify.com' ){
						checkWorkEmail = true;
					}
				}
			} 
			/*
			if( checkType == 'password' || checkName == 'wcustomer[id]' ){}else{
				if( formInput.value !== '' ){
					var checkSpam = looksLikeSpamSmart(formInput.value);
					if(checkSpam){
						required = 1;
					}
				}
			}
				*/
		});
		if( checkWorkEmail == true ){
			const emailDomains = [
				'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'icloud.com',
				'mail.com', 'protonmail.com', 'yandex.com', 'mail.ru', 'rambler.ru', 'live.com',
				'msn.com', 'rediffmail.com', 'zoho.com', 'fastmail.com', 'inbox.com', 'gmx.com',
				'yahoo.co.uk', 'yahoo.ca', 'yahoo.co.in', 'yahoo.com.au', 'yahoo.fr', 'yahoo.de',
				'outlook.co.uk', 'outlook.fr', 'outlook.de', 'outlook.com.au', 'hotmail.co.uk',
				'hotmail.fr', 'hotmail.de', 'hotmail.com.au', 'live.co.uk', 'live.fr', 'live.de',
				'live.com.au', 'me.com', 'mac.com', 'icloud.com'
			];
			formInputs.forEach(formInput => {
				if( formInput.getAttribute('name') == 'wcustomer[email]' ){
					var emailCheck = formInput.value;
					var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
					if (!emailRegex.test(formInput.value)) {}else{
						var domain = formInput.value.split('@')[1];
						if( emailDomains.includes(domain.toLowerCase()) ){
							required = 1;
							var formInputBox = formInput.closest('.onst-field');
							var formInputWarning = formInputBox.querySelectorAll(".onst-warning");
							formInputWarning.forEach(warningElement => {
								warningElement.innerText="Please use work email.";
								warningElement.classList.add('onstactive');
							});
						}
					}
				}
			});
		}
		formSelects.forEach(formSelect => {
			var checkData = formSelect.getAttribute('data-required');
			if( checkData == 'true' ){
				if( formSelect.value !== '' ){}else{
					required = 1;
					var formSelectBox = formSelect.closest('.onst-field');
					var formSelectWarning = formSelectBox.querySelectorAll(".onst-warning");
					formSelectWarning.forEach(warningElement => {
						warningElement.classList.add('onstactive');
					});
				}
			}
		});
		formTextareas.forEach(formTextarea => {
			var checkData = formTextarea.getAttribute('data-required');
			if( checkData == 'true' ){
				if( formTextarea.value !== '' ){}else{
					required = 1;
					var formTextareaBox = formTextarea.closest('.onst-field');
					var formTextareaWarning = formTextareaBox.querySelectorAll(".onst-warning");
					formTextareaWarning.forEach(warningElement => {
						warningElement.classList.add('onstactive');
					});
				}
			}
		});



		if( required == 0 ){
			if( targetButtonSType == 'true' ){
				var recaptchaBox = formElement.querySelector('.recaptcha-box');
				var recaptchaScore = formElement.querySelector('.recaptcha-score');
				if( recaptchaBox ){
					recaptchaBox.classList.add('checking');
					targetButton.disabled = true;
				}else if(recaptchaScore){
					targetButton.disabled = true;
					grecaptcha.ready(function () {
						grecaptcha.execute(
							window.__sureV3SiteKey,
							{
								action: 'custom_form_submit'
							}
						).then(function (token) {
							
							// Send token to your Laravel backend
							fetch(appurl + '/api/verify-recaptcha', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json'
								},
								body: JSON.stringify({
									shop: shopDomain,
									token: token,
									action: 'custom_form_submit'
								})
							})
							.then(function (res) {
								return res.json();
							})
							.then(function (data) {

								if (data.status && data.verified) {

									/*
									* CAPTCHA passed.
									*
									* Mark this form as verified so the
									* next click doesn't execute CAPTCHA again.
									*/
									formElement.dataset.recaptchaVerified ='true';

									targetButton.disabled = false;

									targetButton.setAttribute('data-security', false);

									/*
									* Now trigger your existing submission.
									*/
									targetButton.click();

								} else {

									targetButton.disabled = false;

									console.error(
										'reCAPTCHA verification failed',
										data
									);
								}

							})
							.catch(function (error) {

								targetButton.disabled = false;

								console.error(
									'reCAPTCHA verification error:',
									error
								);

							});

						}).catch(function (error) {

							console.error(
								'reCAPTCHA v3 failed:',
								error
							);

							targetButton.disabled = false;

						});

					});
				}else{
					targetButton.setAttribute('data-security', false);
				}
			}else{
				var formData = {};
				// Iterate over form elements
				for (var i = 0; i < formElement.elements.length; i++) {
					var element = formElement.elements[i];
					if (element.tagName !== "BUTTON" && element.name !== 'h-captcha-response' && element.name !== 'g-recaptcha-response' ) {
						if (element.type === "checkbox") {
							if( element.name == "wcustomer[subscribe]" ){
								if( element.checked ){
									formData[element.name] = true;
								}else{
									formData[element.name] = false;
								}
							}else{
								var checkboxes = formElement.elements[element.name];
								var checkedValues = [];
								if (!checkboxes.length) {
								checkboxes = [checkboxes];
								}
								for (var j = 0; j < checkboxes.length; j++) {
								// Check if the checkbox is checked
								if (checkboxes[j].checked) {
									// If checked, add its value to the array of checked values
									checkedValues.push(checkboxes[j].value);
								}
								}
								formData[element.name] = checkedValues;
							}
						}else{
							if (element.type === "radio") {
								formData[element.name] = formElement.elements[element.name].value;
							}else{
								if( element.name && element.name.includes("surecust") ){}else{
									formData[element.name] = element.value;
								}
							}
						}
					}
				}
				if( targetButton.classList.contains('onstloading') ){}else{
					var formType = '';
					if( formData['wcustomer[formtype]'] == targetButtonType && formData['wcustomer[formtype]'] == targetFormType ){
						formType = formData['wcustomer[formtype]'];
					}
					if( formType == "" ){
						location.reload();
						return false;
					} 
					var postData = formData;
					targetButton.classList.add('onstloading');
					var formSubmissionUrl = '/api/cwcustomerregister';
					if( formType == 'wholesale' ){
						formSubmissionUrl = '/api/cwcustomerregister';
					}
					if( formType == 'contact' ){
						formSubmissionUrl = '/api/cwcustomercontact';
					}
					if( formType == 'customer' ){
						formSubmissionUrl = '/api/ccustomerregister';
					}
					if( formType == 'productenquiry' ){
						formSubmissionUrl = '/api/cwcustomerproductenquiry';
					}

					fetch(appurl+''+formSubmissionUrl,{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json', // Set the content type to JSON
						},
						body: JSON.stringify(postData), // Convert the data to JSON format
					}).then(response => {
						// Check if the request was successful
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						// Parse the response as JSON and return it
						return response.json();
					}).then(data => {
						// Handle the data from the response
						if( data.allow ){
							if( data.status == "already" ){
								for (var i = 0; i < emailwarning.length; i++) {
									var alreadymessage = emailwarning[i].getAttribute('data-already');
									emailwarning[i].innerText=alreadymessage;
									emailwarning[i].classList.add('onstactive');
									var parentStep = emailwarning[i].closest('.onst-field');
									if( parentStep ){
										var errorStep = parentStep.getAttribute('data-step');
										backStep(errorStep, emailwarning[i]);
									}
								}
							}
							if( data.status == "new" ){
								for (let i = 0; i < formInputs.length; i++) {
									if( formInputs[i].getAttribute('type') == 'hidden' || formInputs[i].getAttribute('type') == 'radio' || formInputs[i].getAttribute('type') == 'checkbox' ){}else{
										formInputs[i].value="";
									}	
								}
								for (let i = 0; i < formSelects.length; i++) {
									if( formSelects[i].getAttribute('name') ){
										formSelects[i].value="";
									}
								}
								for (let i = 0; i < formTextareas.length; i++) {
									formTextareas[i].value="";
								}
								var successRed = '';
								for (var i = 0; i < successmessage.length; i++) {
									if( data.msgsuccess ){
										if( data.msgsuccess !== '' ){
											successmessage[i].innerHTML=data.msgsuccess;
										}
									} 
									successmessage[i].classList.add('onstactive');
									if( data.branding ){
										if( brandingadded ){}else{
											brandingadded = true;
											successmessage[i].insertAdjacentHTML('afterend', '<div style="font-size:14px;padding-top:5px;">Powered by: <i>SureCust Forms</i></div>');
										}
									}
									if( successmessage[i].getAttribute('data-redirect') != undefined && successmessage[i].getAttribute('data-redirect') !== '' ){
										successRed = successmessage[i].getAttribute('data-redirect');
									}
								}
								if( data.skip ){
									if( data.skip == true ){
										var loginFormBox = document.querySelectorAll('.onst-login-form-container-box');
										var countForm = 0;
										loginFormBox.forEach(loginFormBoxEl => {
											if( countForm == 0 ){
												var loginForm = loginFormBoxEl.querySelector('form');
												var email = postData['wcustomer[email]'];
												var ppassword = postData['wcustomer[password]'];
												if (window.Shopify && window.Shopify.captcha) {
													if( data.redirect ){
														if( data.redirect !== '' ){
															loginForm.querySelector('input[name="return_to"]').value=data.redirect;
														}
													} 
													loginForm.querySelector('input[name="customer[email]"]').value=email;
													loginForm.querySelector('input[name="customer[password]"]').value=ppassword;
													window.Shopify.captcha.protect(loginForm, () => {
														loginForm.submit();
													});
												} else {
													//loginForm.submit();
												}
											}
											countForm = countForm+1;
										});
									}
								}else{
									if( data.redirect && data.redirect !== '' ){
										location.href=data.redirect;
									}else{
										if( successRed !== '' ){
											location.href=successRed;
										}
									} 
								}
								if( shopDomain == 'diamas-co.myshopify.com' ){
									if( formType == 'customer' ){
										var customFormDetect = document.querySelector('.onst-custom-form');
										if( customFormDetect ){ 
											var checkAlready = customFormDetect.querySelector('.guest-buttons');
											if( checkAlready ){}else{
												customFormDetect.insertAdjacentHTML(
													"beforeend",
													`<div class="guest-buttons">
														<a href="/pages/b2b-login" class="button">
														Create account
														</a>
														<a href="/pages/diamas-white-label-guest" class="button">
														Continue as Guest
														</a>
													</div>`
												);
											}
										}
										localStorage.setItem("guest_button_added", "true");
									}
								}
							}
							targetButton.classList.remove('onstloading');
						}else{
							if( data.vat ){
								if( data.vat == 'notvalid' ){
									formInputs.forEach(formInput => {
										var getName = formInput.getAttribute('name');
										if( getName == 'Partita IVA' ){
											var formInputParent = formInput.closest('.onst-field');
											var warningElement = formInputParent.querySelector('.onst-warning');
											if( warningElement ){
												warningElement.innerText="Partita IVA non valida";
												warningElement.classList.add('onstactive');
												var parentStep = warningElement.closest('.onst-field');
												if( parentStep ){
													var errorStep = parentStep.getAttribute('data-step');
													backStep(errorStep, warningElement);
												}
											}
										}
									});
								}
								targetButton.classList.remove('onstloading');
							}else{
								location.reload();
							}
						}
					}).catch(error => {
						if( formType == 'wholesale' ){
							fetch(appurl+'/api/cwcustomerregisterb',{
								method: 'POST',
								headers: {
									'Content-Type': 'application/json', // Set the content type to JSON
								},
								body: JSON.stringify(postData), // Convert the data to JSON format
							}).then(response => {
								// Check if the request was successful
								if (!response.ok) {
									throw new Error('Network response was not ok');
								}
								// Parse the response as JSON and return it
								return response.json();
							}).then(data => {
								// Handle the data from the response
								if( data.allow ){
									if( data.status == "already" ){
										for (var i = 0; i < emailwarning.length; i++) {
											var alreadymessage = emailwarning[i].getAttribute('data-already');
											emailwarning[i].innerText=alreadymessage;
											emailwarning[i].classList.add('onstactive');
											var parentStep = emailwarning[i].closest('.onst-field');
											if( parentStep ){
												var errorStep = parentStep.getAttribute('data-step');
												backStep(errorStep, emailwarning[i]);
											}
										}
									}
									if( data.status == "new" ){
										for (let i = 0; i < formInputs.length; i++) {
											if( formInputs[i].getAttribute('type') == 'hidden' || formInputs[i].getAttribute('type') == 'radio' || formInputs[i].getAttribute('type') == 'checkbox' ){}else{
												formInputs[i].value="";
											}	
										}
										for (let i = 0; i < formSelects.length; i++) {
											if( formSelects[i].getAttribute('name') ){
												formSelects[i].value="";
											}
										}
										for (let i = 0; i < formTextareas.length; i++) {
											formTextareas[i].value="";
										}
										var successRed = '';
										for (var i = 0; i < successmessage.length; i++) {
											if( data.msgsuccess ){
												if( data.msgsuccess !== '' ){
													successmessage[i].innerHTML=data.msgsuccess;
												}
											}
											successmessage[i].classList.add('onstactive');
											if( data.branding ){
												if( brandingadded ){}else{
													brandingadded = true;
													successmessage[i].insertAdjacentHTML('afterend', '<div style="font-size:14px;padding-top:5px;">Powered by: <i>SureCust Forms</i></div>');
												}
											}
											if( successmessage[i].getAttribute('data-redirect') != undefined && successmessage[i].getAttribute('data-redirect') !== '' ){
												successRed = successmessage[i].getAttribute('data-redirect');
											}
										}
										if( data.skip ){
											if( data.skip == true ){
												var loginFormBox = document.querySelectorAll('.onst-login-form-container-box');
												var countForm = 0;
												loginFormBox.forEach(loginFormBoxEl => {
													if( countForm == 0 ){
														var loginForm = loginFormBoxEl.querySelector('form');
														var email = postData['wcustomer[email]'];
														var ppassword = postData['wcustomer[password]'];
														if (window.Shopify && window.Shopify.captcha) {
															if( data.redirect ){
																if( data.redirect !== '' ){
																	loginForm.querySelector('input[name="return_to"]').value=data.redirect;
																}
															}
															loginForm.querySelector('input[name="customer[email]"]').value=email;
															loginForm.querySelector('input[name="customer[password]"]').value=ppassword;
															window.Shopify.captcha.protect(loginForm, () => {
																loginForm.submit();
															});
														} else {
															//loginForm.submit();
														}
													}
													countForm = countForm+1;
												});
											}
										}else{
											if( data.redirect && data.redirect !== '' ){
												location.href=data.redirect;
											}else{
												if( successRed !== '' ){
													location.href=successRed;
												}
											} 
										}
									}
									targetButton.classList.remove('onstloading');
								}else{
									if( data.vat ){
										if( data.vat == 'notvalid' ){
											formInputs.forEach(formInput => {
												var getName = formInput.getAttribute('name');
												if( getName == 'Partita IVA' ){
													var formInputParent = formInput.closest('.onst-field');
													var warningElement = formInputParent.querySelector('.onst-warning');
													if( warningElement ){
														warningElement.innerText="Partita IVA non valida";
														warningElement.classList.add('onstactive');
														var parentStep = warningElement.closest('.onst-field');
														if( parentStep ){
															var errorStep = parentStep.getAttribute('data-step');
															backStep(errorStep, warningElement);
														}
													}
												}
											});
										}
										targetButton.classList.remove('onstloading');
									}else{
										location.reload();
									}
								}
							}).catch(error => {
								fetch(appurl+'/api/cwcustomerregisterb1',{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json', // Set the content type to JSON
									},
									body: JSON.stringify(postData), // Convert the data to JSON format
								}).then(response => {
									// Check if the request was successful
									if (!response.ok) {
										throw new Error('Network response was not ok');
									}
									// Parse the response as JSON and return it
									return response.json();
								}).then(data => {
									// Handle the data from the response
									if( data.allow ){
										if( data.status == "already" ){
											for (var i = 0; i < emailwarning.length; i++) {
												var alreadymessage = emailwarning[i].getAttribute('data-already');
												emailwarning[i].innerText=alreadymessage;
												emailwarning[i].classList.add('onstactive');
												var parentStep = emailwarning[i].closest('.onst-field');
												if( parentStep ){
													var errorStep = parentStep.getAttribute('data-step');
													backStep(errorStep, emailwarning[i]);
												}
											}
										}
										if( data.status == "new" ){
											for (let i = 0; i < formInputs.length; i++) {
												if( formInputs[i].getAttribute('type') == 'hidden' || formInputs[i].getAttribute('type') == 'radio' || formInputs[i].getAttribute('type') == 'checkbox' ){}else{
													formInputs[i].value="";
												}	
											}
											for (let i = 0; i < formSelects.length; i++) {
												if( formSelects[i].getAttribute('name') ){
													formSelects[i].value="";
												}
											}
											for (let i = 0; i < formTextareas.length; i++) {
												formTextareas[i].value="";
											}
											var successRed = '';
											for (var i = 0; i < successmessage.length; i++) {
												if( data.msgsuccess ){
													if( data.msgsuccess !== '' ){
														successmessage[i].innerHTML=data.msgsuccess;
													}
												}
												successmessage[i].classList.add('onstactive');
												if( data.branding ){
													if( brandingadded ){}else{
														brandingadded = true;
														successmessage[i].insertAdjacentHTML('afterend', '<div style="font-size:14px;padding-top:5px;">Powered by: <i>SureCust Forms</i></div>');
													}
												}
												if( successmessage[i].getAttribute('data-redirect') != undefined && successmessage[i].getAttribute('data-redirect') !== '' ){
													successRed = successmessage[i].getAttribute('data-redirect');
												}
											}
											if( data.skip ){
												if( data.skip == true ){
													var loginFormBox = document.querySelectorAll('.onst-login-form-container-box');
													var countForm = 0;
													loginFormBox.forEach(loginFormBoxEl => {
														if( countForm == 0 ){
															var loginForm = loginFormBoxEl.querySelector('form');
															var email = postData['wcustomer[email]'];
															var ppassword = postData['wcustomer[password]'];
															if (window.Shopify && window.Shopify.captcha) {
																if( data.redirect ){
																	if( data.redirect !== '' ){
																		loginForm.querySelector('input[name="return_to"]').value=data.redirect;
																	}
																}
																loginForm.querySelector('input[name="customer[email]"]').value=email;
																loginForm.querySelector('input[name="customer[password]"]').value=ppassword;
																window.Shopify.captcha.protect(loginForm, () => {
																	loginForm.submit();
																});
															} else {
																//loginForm.submit();
															}
														}
														countForm = countForm+1;
													});
												}
											}else{
												if( data.redirect && data.redirect !== '' ){
													location.href=data.redirect;
												}else{
													if( successRed !== '' ){
														location.href=successRed;
													}
												} 
											}
										}
										targetButton.classList.remove('onstloading');
									}else{
										if( data.vat ){
											if( data.vat == 'notvalid' ){
												formInputs.forEach(formInput => {
													var getName = formInput.getAttribute('name');
													if( getName == 'Partita IVA' ){
														var formInputParent = formInput.closest('.onst-field');
														var warningElement = formInputParent.querySelector('.onst-warning');
														if( warningElement ){
															warningElement.innerText="Partita IVA non valida";
															warningElement.classList.add('onstactive');
															var parentStep = warningElement.closest('.onst-field');
															if( parentStep ){
																var errorStep = parentStep.getAttribute('data-step');
																backStep(errorStep, warningElement);
															}
														}
													}
												});
											}
											targetButton.classList.remove('onstloading');
										}else{
											location.reload();
										}
									}
								}).catch(error => {
									console.log(error);
									// Handle errors
									alert("Something went wrong, Please try after reload");
									location.reload();
								});
							});
						}else{
							if( formType == 'contact' ){
								fetch(appurl+'/api/cwcustomercontactb',{
									method: 'POST',
									headers: {
										'Content-Type': 'application/json', // Set the content type to JSON
									},
									body: JSON.stringify(postData), // Convert the data to JSON format
								}).then(response => {
									// Check if the request was successful
									if (!response.ok) {
										throw new Error('Network response was not ok');
									}
									// Parse the response as JSON and return it
									return response.json();
								}).then(data => {
									// Handle the data from the response
									if( data.allow ){
										if( data.status == "already" ){
											for (var i = 0; i < emailwarning.length; i++) {
												var alreadymessage = emailwarning[i].getAttribute('data-already');
												emailwarning[i].innerText=alreadymessage;
												emailwarning[i].classList.add('onstactive');
												var parentStep = emailwarning[i].closest('.onst-field');
												if( parentStep ){
													var errorStep = parentStep.getAttribute('data-step');
													backStep(errorStep, emailwarning[i]);
												}
											}
										}
										if( data.status == "new" ){
											for (let i = 0; i < formInputs.length; i++) {
												if( formInputs[i].getAttribute('type') == 'hidden' || formInputs[i].getAttribute('type') == 'radio' || formInputs[i].getAttribute('type') == 'checkbox' ){}else{
													formInputs[i].value="";
												}	
											}
											for (let i = 0; i < formSelects.length; i++) {
												if( formSelects[i].getAttribute('name') ){
													formSelects[i].value="";
												}
											}
											for (let i = 0; i < formTextareas.length; i++) {
												formTextareas[i].value="";
											}
											var successRed = '';
											for (var i = 0; i < successmessage.length; i++) {
												if( data.msgsuccess ){
													if( data.msgsuccess !== '' ){
														successmessage[i].innerHTML=data.msgsuccess;
													}
												}
												successmessage[i].classList.add('onstactive');
												if( data.branding ){
													if( brandingadded ){}else{
														brandingadded = true;
														successmessage[i].insertAdjacentHTML('afterend', '<div style="font-size:14px;padding-top:5px;">Powered by: <i>SureCust Forms</i></div>');
													}
												}
												if( successmessage[i].getAttribute('data-redirect') != undefined && successmessage[i].getAttribute('data-redirect') !== '' ){
													successRed = successmessage[i].getAttribute('data-redirect');
												}
											}
											if( data.skip ){
												if( data.skip == true ){
													var loginFormBox = document.querySelectorAll('.onst-login-form-container-box');
													var countForm = 0;
													loginFormBox.forEach(loginFormBoxEl => {
														if( countForm == 0 ){
															var loginForm = loginFormBoxEl.querySelector('form');
															var email = postData['wcustomer[email]'];
															var ppassword = postData['wcustomer[password]'];
															if (window.Shopify && window.Shopify.captcha) {
																loginForm.querySelector('input[name="customer[email]"]').value=email;
																loginForm.querySelector('input[name="customer[password]"]').value=ppassword;
																window.Shopify.captcha.protect(loginForm, () => {
																	loginForm.submit();
																});
															} else {
																//loginForm.submit();
															}
														}
														countForm = countForm+1;
													});
												}
											}else{
												if( data.redirect && data.redirect !== '' ){
													location.href=data.redirect;
												}else{
													if( successRed !== '' ){
														location.href=successRed;
													}
												} 
											}
										}
										targetButton.classList.remove('onstloading');
									}else{
										if( data.vat ){
											if( data.vat == 'notvalid' ){
												formInputs.forEach(formInput => {
													var getName = formInput.getAttribute('name');
													if( getName == 'Partita IVA' ){
														var formInputParent = formInput.closest('.onst-field');
														var warningElement = formInputParent.querySelector('.onst-warning');
														if( warningElement ){
															warningElement.innerText="Partita IVA non valida";
															warningElement.classList.add('onstactive');
															var parentStep = warningElement.closest('.onst-field');
															if( parentStep ){
																var errorStep = parentStep.getAttribute('data-step');
																backStep(errorStep, warningElement);
															}
														}
													}
												});
											}
											targetButton.classList.remove('onstloading');
										}else{
											location.reload();
										}
									}
								}).catch(error => {
									console.log(error);
									// Handle errors
									alert("Something went wrong, Please try after reload");
									location.reload();
								});
							}else{
								console.log(error);
								// Handle errors
								alert("Something went wrong, Please try after reload");
								location.reload();
							}
						}
					});
				}
			}
		}else{
			if (formElement) {
				formElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		}
	}

	function formFieldUploadFunction(uploadField){

			var file = uploadField.files[0];
			var fieldBox = uploadField.closest('.onst-upload-field');
			var formElement = uploadField.closest('.onst-custom-form');
			var checkData = uploadField.getAttribute('data-required');
			var errorMsg = fieldBox.querySelector('.onst-warning');

			var uploadBar = fieldBox.querySelector('.upload-file-loader');
			var progressBar = fieldBox.querySelector('.upload-loader-progress');
			var uploadFileValue = fieldBox.querySelector('input[type="hidden"]');

			var fileNameText = fieldBox.querySelector('.onst-selected-file-name');
			var errorMessage = errorMsg.getAttribute('data-required');
			var validMessage = errorMsg.getAttribute('data-valid');
			var customerIdInput = formElement.querySelector('input[name="wcustomer[id]"]');
			var shopInput = formElement.querySelector('input[name="wcustomer[shop]"]');
			var submitButton = formElement.querySelector('.onst-custom-form-submit');

			if( checkData == 'true' ){
				if (!file) {
					fileNameText.innerText = '';
					errorMsg.innerText = errorMessage;
					errorMsg.classList.add('onstactive');
					return;
				}
			}

			errorMsg.classList.remove('onstactive');
			errorMsg.innerText = validMessage;
			fileNameText.innerText = file.name;

			var maxSizeInBytes = 5 * 1024 * 1024;

			if( shopInput.value == 'emanaskin.myshopify.com' ){
				maxSizeInBytes = 25 * 1024 * 1024;
			}

			if (file.size > maxSizeInBytes) {
				errorMsg.classList.add('onstactive');
				uploadField.value="";
				return;
			}

			errorMsg.classList.remove('onstactive');
			errorMsg.innerText = errorMessage;

			var formData = new FormData();
			formData.append('file', file);
			formData.append('shop', shopInput.value);
			formData.append('customer', customerIdInput.value);

			submitButton.classList.add('uploading-file');
			uploadBar.classList.add('onstactive');

			// URLs
			var primaryUrl = appurl + '/api/uploadfilefunc';
			var backupUrl = appurl + '/api/uploadfilefuncb';

			uploadFile(primaryUrl, false);

			function uploadFile(url, isRetry){

				var xhr = new XMLHttpRequest();

				xhr.open('POST', url, true);

				// Upload Progress
				xhr.upload.addEventListener('progress', function (event) {
					if (event.lengthComputable) {
						var percentComplete = (event.loaded / event.total) * 100;
						progressBar.style.width = Math.max(percentComplete - 5, 1) + '%';
					}
				});

				xhr.onload = function () {

					if (xhr.status === 200) {

						try{

							var data = JSON.parse(xhr.responseText);

							if(data.allow){

								submitButton.classList.remove('uploading-file');

								uploadFileValue.value = data.file_path;

								uploadBar.classList.remove('onstactive');

								progressBar.style.width = '1%';

							}else{

								if(!isRetry){

									console.log('Retry upload on backup URL');

									uploadFile(backupUrl, true);

								}else{

									handleUploadError();

								}
							}

						}catch(e){

							if(!isRetry){

								uploadFile(backupUrl, true);

							}else{

								handleUploadError();

							}
						}

					}else{

						if(!isRetry){

							console.log('Primary upload failed, retrying backup');

							uploadFile(backupUrl, true);

						}else{

							handleUploadError();

						}
					}
				};

				xhr.onerror = function () {

					if(!isRetry){

						console.log('Network error, retrying backup');

						uploadFile(backupUrl, true);

					}else{

						handleUploadError();

					}
				};

				xhr.send(formData);
			}

			function handleUploadError(){

				console.error('Upload failed on both URLs');

				submitButton.classList.remove('uploading-file');

				uploadBar.classList.remove('onstactive');

				progressBar.style.width = '1%';

				alert("Something went wrong, Please try again");

			}
		}
	
	function rearrangeArrayByPosition(array) {
		// Sort the array of objects based on the 'position' property
		array.sort((a, b) => a.position - b.position);
		return array;
	}
 
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', onReady);
} else {
  onReady();
}