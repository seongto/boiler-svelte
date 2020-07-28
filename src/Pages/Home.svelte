<script>
    import * as constants from '../assets/js/constants.js';

    import Header from '../Components/Header.svelte';
    import Footer from '../Components/Footer.svelte';
    import Meta from '../Components/Meta.svelte';

    const mssg = process.env.isProd;
    console.log(mssg);
    console.log('FOO');

</script>

<Header/>

<Footer />


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    .sections {
        background-color: white;
        max-width: $wrapper;
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
            padding: 0 12px;
        }

        .section-title {
            font-size: 1.2em;
            font-weight: 700;
            color: $theme-color1;
        }

        .section-description {
            font-size: 0.8em;
            color: $sub-color1;
            margin-top: 6px;

            @include respond-to('w600') {
                width: 100%;
            }
        }
    }

    :global(.sections::-webkit-scrollbar) {
        display: none;
    }

</style>