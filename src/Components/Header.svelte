<script>

</script>

<div class="header">
    <div class="header-wrapper">
        <a href="https://home.allius.io" class="logo">allius</a>
        <ul>
            <li>
                <a href="https://allius.io/desk" target="_blank">Login</a>
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