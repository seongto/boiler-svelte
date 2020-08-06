<script context="module">
    import { navigate }   from "svelte-routing";

    export const logOut = () => {
        localStorage.removeItem(process.env.TOKEN_KEY);
        navigate("/auth-login", { replace: true });
    }

    export const loginCheck = () => {
        let token = localStorage.getItem(process.env.TOKEN_KEY);
        if (!token) {
            navigate("/", {replace: true});
        }
    }

</script>