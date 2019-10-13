$(() => {
    /* signing up a user */

    $("#sign-up").on('click', (e) => {
        e.preventDefault();
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#pwd").val();
        const data = { name: name, email: email, password: password }
        if (name.length < 1 || email.length < 1 || password.length < 1) {
            $('.empty-data').show();
            return;
        }
    });
            /* Query database to check existing email */
            $.ajax({
                url: "http://localhost:3000/users?email=" + email,
                type: "GET",
                contentType: "application/json",
                success: (result, status, xhr) => {
                    console.log(result);
    
                    if (result.length > 0) {
                        $('.already-data').show();
                    } else {
                        $.ajax({
                            url: "http://localhost:3000/users",
                            data: JSON.stringify(data),
                            type: "POST",
                            contentType: "application/json",
                            error: (xhr, status, error) => {
                                alert(error)
                            },
                            success: (result, status, xhr) => {
                                window.location.href = "login.html";
    
                            }
    
                        });
                    }
    
                }
    
            });
    
});