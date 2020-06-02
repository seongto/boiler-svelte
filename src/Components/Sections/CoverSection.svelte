<script>
    import * as constants from '../../assets/js/constants.js';
    import { onMount } from 'svelte';

    export let imgWidth;

    let coverArray = [
        {
            "titleH" : "나의 브랜드로 \n만드는 기회",
            "titleP" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.",
            "imgUrl" : "/static-images/landing-main-sample.jpg", 
        },{
            "titleH" : "나의 브랜드로 \n만드는 기회2",
            "titleP" : "나를 브랜딩하고, \n새로운 프로젝트를 발견하세요.2",
            "imgUrl" : "/static-images/landing-main-sample.jpg", 
        }
    ]

</script>

<div class="cover-wrapper">
    <div class="title" style="height:{imgWidth};">
        <h1>나의 브랜드로<br>만드는 기회</h1>
        <p>나를 브랜딩하고,<br>새로운 프로젝트를 발견하세요.</p>
    </div>
    <img alt="cover-image" width={imgWidth} height={imgWidth} src="{constants.IMG_URL}/static-images/landing-main-sample.jpg">
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .cover-wrapper {
        display: flex;
        justify-content: space-between;
        padding-top: 100px;

        @include respond-to('w600') {
            justify-content: left;
            flex-direction: column;
        }

        .title {
            font-family: $font-kr;
            align-self : center;

            @include respond-to('w600') {
                align-self: auto;
                padding: 30px 0;
            }

            h1 {
                font-size: 2em;
                line-height: 1.2em;
                color: $sub-color1;
            }

            p {
                margin-top: 15px;
                font-size: 0.9em;
                color: $theme-color1;
            }
        }

        img {
            border-radius: 8px;

            @include respond-to('w600') {
                margin-top: 20px;
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
        }
    }
</style>