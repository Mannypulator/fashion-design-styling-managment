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
});