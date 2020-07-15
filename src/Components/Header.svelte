<script>
    import { Link, navigate }  from "svelte-routing"
    import { onMount }         from 'svelte'
    import * as constants      from '../assets/js/constants.js';

    let token;

    const logOut = () => {
        localStorage.removeItem(constants.TOKEN_KEY);
        navigate("/auth-login", { replace: true });
    }

    onMount(() => {
        token = localStorage.getItem(constants.TOKEN_KEY);
        if (!token) {
            navigate("/auth-login", {replace: true});
        }
    });
</script>

<div class="header">
    <div class="header-wrapper">
        <Link to="/"><div class="logo">allius admin</div></Link>
        <ul>
            <li>
                <Link to="manage/stories"><span>스토리 관리</span></Link>
            </li>
            <li>
                <Link to="manage/events"><span>이벤트 관리</span></Link>
            </li>
            <li>
                <span class="logout" on:click={logOut}>로그아웃</span>
            </li>
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
            padding: 15px 30px 10px;
            display: flex;
            justify-content: space-between;

            @include respond-to('w600') {
                padding: 12px;
            }
            
            .logo {
                display: block;
                font-family: $font-kr;
                font-size: 20px;
                font-weight: 700;
                color: $theme-color1;
            }

            ul{
                
                li {
                    display: block;
                    margin-left: 15px;
                    float: left;

                    span {
                        font-family: $font-kr;
                        font-size: 15px;
                        display: block;
                        padding: 6px 0px;
                        color: $theme-color1;
                        border-top: 2px solid $theme-color1;
                        transition: 0.2s all;
                        cursor: pointer;

                        &.logout {
                            color: $theme-color2;
                            border-top-color: $theme-color2;
                        }

                        &:hover{
                            border-top-width: 5px;
                            padding-top: 3px;
                        }
                    }
                }
            }
        }
    }

</style>