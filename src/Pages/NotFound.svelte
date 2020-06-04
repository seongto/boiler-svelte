<script>
    import * as constants from '../assets/js/constants.js';
    
    import Header   from '../Components/Header.svelte';
    import Footer   from '../Components/Footer.svelte';
    import Meta     from '../Components/Meta.svelte';
    import Terms    from '../Components/Terms.svelte';


</script>

<Meta />
<Header />
<div class="wrapper">
    <h1>
        Page Not Found.
    </h1>
</div>
<Footer />


<style lang="scss">
    @import '../assets/scss/common.scss';
    .wrapper {
        background-color: white;
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0px 30px;
        font-size: $font-size;
        font-family: $font-kr;
        word-break: keep-all;;

        h1 {
            padding-top: 50px;
            font-size: 100px;
            margin: 0 auto;
        }
    }
</style>