<script>
    import * as constants       from '../assets/js/constants.js';
    import { catchError }       from '../assets/js/functions.svelte';
    import { onMount }          from 'svelte';
    import { Link, navigate }   from "svelte-routing";
    import axios                from "axios"

    let userEmail;
    let userPw;

    const submitAuth = () => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/login`,
            data: {
                'user_email': userEmail,
                'user_pw': userPw,
            }
        })
        .then(resp => {
            localStorage.setItem(constants.TOKEN_KEY, resp.data["access_token"]);
            navigate("/", {replace: true});
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    onMount(() => {
        let token = localStorage.getItem(constants.TOKEN_KEY);
        if (token) {
            navigate("/", {replace: true});
        };
    });

</script>

<div class="sections">
    <h2 class="section-title">allius login</h2>
    <input type="email" class="input-box input-email" bind:value={userEmail} placeholder="이메일을 입력하세요.">
    <input type="password" class="input-box input-pw" bind:value={userPw} placeholder="패스워드를 입력하세요.">
    <div class="submit" on:click={()=>submitAuth()}>로그인</div>
</div>


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    .sections {
        background-color: white;
        max-width: 600px;
        margin: 100px auto 0;
        padding: 0px 30px;
        font-size: $font-size;
        font-family: $font-kr;
        word-break: keep-all;

        @include respond-to('w1000') {
            font-size: $font-size * 0.9;
        }

        @include respond-to('w800') {
            font-size: $font-size * 0.8;
        }

        @include respond-to('w600') {
            
        }

        .section-title {
            font-size: 1.2em;
            font-weight: 700;
            color: $theme-color1;
            margin-bottom: 50px;
        }

        .input-box {
            display: block;
            border: none;
            border-radius: none;
            border-bottom: 2px solid $theme-color1;
            margin-top: 10px;
            width: 300px;
            padding: 10px 1px;

            font-size: 0.8em;
            font-weight: 400;
            font-family: $font-kr;

            &::placeholder {
                color: #cccccc;
            }
        }

        .submit {
            display: inline-block;
            margin-top: 20px;
            color: $theme-color1;
            border: 3px solid $theme-color1;
            padding: 2px 20px;
            font-size: 0.8em;
            text-align: center;
            border-radius: 50px;
            background-color: white;

            &:hover {
                background-color: $theme-color1;
                color: white;
                cursor: pointer;
            }
        }

    }

    :global(.sections::-webkit-scrollbar) {
        display: none;
    }

</style>