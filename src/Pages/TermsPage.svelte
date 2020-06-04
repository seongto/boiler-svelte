<script>
    import * as constants from '../assets/js/constants.js';
    import { onMount } from 'svelte';
    
    import Header   from '../Components/Header.svelte';
    import Footer   from '../Components/Footer.svelte';
    import Meta     from '../Components/Meta.svelte';
    import Terms    from '../Components/Terms.svelte';

    let scrollY;

    onMount(() => {
        scrollY = 0;

    });

</script>

<svelte:head>
    <title>'allius'</title>
    <meta name="title" content='allius' />
    <meta property="og:title" content='allius' />
    <meta property="twitter:title" content='allius' />

    <meta name="description" content='나의 브랜드로 만드는 기회' />
    <meta property="og:description" content='나의 브랜드로 만드는 기회' />
    <meta property="twitter:description" content='나의 브랜드로 만드는 기회' />

    <meta property="og:image" content="{constants.IMG_URL}/static-images/meta_img_01.jpg" />
    <meta
    property="twitter:image"
    content="{constants.IMG_URL}/static-images/meta_img_01.jpg"
    />

    <meta property="og:image:alt" content='나의 브랜드로 만드는 기회' />
    <meta property="twitter:image:alt" content='나의 브랜드로 만드는 기회' />

    <meta property="og:url" content='https://home.allius.io'/>
    <meta property="twitter:url" content='https://home.allius.io' />

    <meta property="og:type" content="website" />
</svelte:head>

<Header />
<div class="sections">
    <Terms />
</div>
<Footer />

<svelte:window bind:scrollY={scrollY}/>


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    .sections {
        background-color: white;
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0px 30px;
        font-size: $font-size * 0.8;
        font-family: $font-kr;
        word-break: keep-all;

        @include respond-to('w1000') {
            font-size: $font-size * 0.75;
        }

        @include respond-to('w800') {
            font-size: $font-size * 0.7;
        }

        @include respond-to('w600') {
            padding: 0 12px;
        }

    }

</style>