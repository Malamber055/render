"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA  - Anonymous Self-Executing Function
(function () {
  /**
   * Converts first letters in a string to uppercase - lowercasing the rest (pascal casing)
   * @param {string} str
   * @returns {string}
   */
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function DisplayHomePage(): void {
    console.log("Home Page");

    $("#AboutUsBtn").on("click", () => {
      location.href = "/about";
    });
  }

  function DisplayProductsPage(): void {
    console.log("Our Products Page");
  }

  function DisplayServicesPage(): void {
    console.log("Our Services Page");
  }

  function DisplayAboutUsPage(): void {
    console.log("About Us Page");
  }

  /**
   * Add a contact to localStorage
   * @param {string} fullName
   * @param {string} contactNumber
   * @param {string} emailAddress
   */
  function AddContact(fullName: string, contactNumber: string,  emailAddress: string ): void {
    let contact = new core.Contact(fullName, contactNumber, emailAddress);
    if (contact.serialize()) {
      let key = contact.FullName.substring(0, 1) + Date.now();
      localStorage.setItem(key, contact.serialize() as string);
    }
  }

  function ContactFormValidation(): void {
    ValidateField(
      "#fullName",
      /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
      "Please enter a valid first and lastname."
    );

    ValidateField(
      "#contactNumber",
      /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
      "Please enter a valid phone contact number."
    );

    ValidateField(
      "#emailAddress",
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
      "Please enter a valid email address"
    );
  }

  /**
   * This function will validate field input based on based regular expression
   * @param {string} input_field_id
   * @param {RegExp} regular_expression
   * @param {string} error_message
   */
  function ValidateField( input_field_id: string, regular_expression: RegExp,   error_message: string ) {
    let messageArea = $("#messageArea").hide();

    $(input_field_id).on("blur", function () {
      let inputFieldText = $(this).val() as string;
      if (!regular_expression.test(inputFieldText)) {
        $(this).trigger("focus").trigger("select");
        messageArea.addClass("alert alert-danger").text(error_message).show();
      } else {
        messageArea.removeAttr("class").hide();
      }
    });
  }

  function DisplayContactPage(): void {
    console.log("Contact Us Page");

    $("a[data='contact-list']").off("click");
    $("a[data='contact-list']").on("click", function () {
      location.href = "/contact-list";
    });

    ContactFormValidation();

    let sendButton = document.getElementById("sendButton") as HTMLElement;
    let subscribeCheckbox = document.getElementById(
      "subscribeCheckbox"
    ) as HTMLInputElement;

    sendButton.addEventListener("click", function (event) {
      if (subscribeCheckbox.checked) {
        let fullName = document.forms[0].fullName.value;
        let contactNumber = document.forms[0].contactNumber.value;
        let emailAddress = document.forms[0].emailAddress.value;

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
          let key = contact.FullName.substring(0, 1) + Date.now();
          localStorage.setItem(key, contact.serialize() as string);
        }
      }
    });
  }

  function DisplayContactListPage(): void {
    console.log("ContactList Page");

    $("a.delete").on("click", function (event) {
      //confirm delete
      if (!confirm("Delete contact, are you sure?")) {
          event.preventDefault();
          location.href = "/contact-list";
      }
    });

  }

  function DisplayEditPage(): void {
    console.log("Edit Contact Page");
    ContactFormValidation();
  }

  function CheckLogin(): void {
    if (sessionStorage.getItem("user")) {
      //swap out the login link for a logout link
      $("#login").html(`<a id="logout" class="nav-link" href="#">
                            <i class="fas fa-sign-out-alt"></i> Logout</a>`);
    }

    $("#logout").on("click", function () {
      //perform logout
      sessionStorage.clear();

      $("#login").html(`<a class="nav-link" data="login">
                                                    <i class="fas fa-sign-in-alt"></i> Login</a>`);

      //redirect to login.html page
      location.href = "/login";
    });
  }

  function DisplayLoginPage(): void {
    console.log("Display Login Page");

  }

  function DisplayRegisterPage(): void {
    console.log("Display Register Page");
  }

  function Display404Page(): void {
    console.log("Display 404 Page");
  }

  function AuthGuard(): void {
    let protected_routes: string[] = ["/contact-list", "/edit"] ;

    if (protected_routes.indexOf(location.pathname) > -1) {
      if (!sessionStorage.getItem("user")) {
          location.href = "/login";
      }
    }
  }


  /**
   * Entry point to the web application
   */
  function Start(): void {
    console.log("App Started!");

    let page_id = $("body")[0].getAttribute("id");

    switch (page_id)
    {
      case "home":
        DisplayHomePage();
        break;
      case "about":
        DisplayAboutUsPage();
        break;
      case "services":
        DisplayServicesPage();
        break;
      case "contact":
        DisplayContactPage();
        break;
      case "contact-list":
        DisplayContactListPage();
        break;
      case "products":
        DisplayProductsPage();
        break;
      case "register":
        DisplayRegisterPage();
        break;
      case "login":
        DisplayLoginPage();
        break;
      case "edit":
        DisplayEditPage();
        break;
      case "add":
        DisplayEditPage();
        break;
      case "404":
        Display404Page();
        break;
    }

  }


  window.addEventListener("load", Start);
})();
