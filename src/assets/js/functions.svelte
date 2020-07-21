<script context="module">
    import * as constants   from './constants.js';

    export const catchError = (error) => {
        if (error.response) {
            if (error.response.data.status === 401) {
                window.alert("로그인 정보가 만료되었습니다. 다시 로그인해 주세요.");
                localStorage.removeItem(constants.TOKEN_KEY);
                navigate("/auth-login", {replace: false});
            }
            window.alert(error.response.data.comment);
        }
        else {
            console.log('Error', error.message);
            window.alert("문제가 발생하였습니다. 잠시 후 다시 시도해주세요.");
        }
        console.log(error.config);
    }

</script>