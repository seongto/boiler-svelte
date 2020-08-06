<script>
    import { catchError }       from '../assets/js/functions.svelte';
    import { onMount }          from 'svelte';
    import { Link, navigate }   from "svelte-routing";
    import axios                from "axios"
    

    let userEmail;
    let userPw;

    const submitAuth = () => {
        axios({
            method: 'post',
            url: `${process.env.SERVER_API}/admin-management/login`,
            data: {
                'user_email': userEmail,
                'user_pw': userPw,
            }
        })
        .then(resp => {
            localStorage.setItem(process.env.TOKEN_KEY, resp.data["access_token"]);
            navigate("/", {replace: true});
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    onMount(() => {        
        let token = localStorage.getItem(process.env.TOKEN_KEY);
        if (token) {
            navigate("/", {replace: true});
        };
    });

</script>


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    
</style>