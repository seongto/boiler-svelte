<script>
    import { Router, Link, Route } from "svelte-routing"
    import { onMount }      from 'svelte'

    let loginCheck;

    const getCookie = (key) => {
        let value = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return value? value[2] : null;
    };

    onMount(() => {
        let addrs = location.href.substring(location.protocol.length);

        if (location.protocol !== 'https:') {
            if ((addrs !== '//localhost:5000/') && (addrs !== '//dev0828rw.allius.io/')) {
                location.replace(`https:${location.href.substring(location.protocol.length)}`);
            }
        }

        loginCheck = Boolean(getCookie('allius_id'));
        
    });
</script>

<div class="header">
    <div class="header-wrapper">
        <Link to="/"><div class="logo">allius</div></Link>
        <ul>
            {#if loginCheck}
                <li>
                    <a href="https://allius.io/desk" target="_self">Studio</a>
                </li>
            {:else}
                <li>
                    <a href="https://allius.io/login" target="_self">Login</a>
                </li>
            {/if}
        </ul>
    </div>
</div>

<style lang="scss">
    @import '../assets/scss/common.scss';

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(255,255,255,0.9);
        border-bottom: 1px solid rgba(0,0,0, 0.1);

        .header-wrapper {
            margin: 0 auto;
            max-width: $wrapper;
            padding: 12px 30px;
            display: flex;
            justify-content: space-between;

            @include respond-to('w600') {
                padding: 12px;
            }
            
            .logo {
                display: block;
                text-indent: -9999px;
                background-image: url("https://allius.io/assets/img/allius-logo.png");
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                width: 65px;
                height: 23px;
            }

            li a {
                font-family: $font-kr;
                font-size: 12px;
                display: block;
                float: right;
                padding: 4px 12px;
                border-radius: 4px;
                color: $theme-color1;
                border: 1px solid $theme-color1;
            }
        }
    }

</style>