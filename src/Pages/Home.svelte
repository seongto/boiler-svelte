<script>
    import * as constants from '../assets/js/constants.js';

    import BrandStorySection from '../Components/Sections/BrandStorySection.svelte';
    import CoverSection from '../Components/Sections/CoverSection.svelte';
    import TutorialSection from '../Components/Sections/TutorialSection.svelte';
    import CommunityEventsSection from '../Components/Sections/CommunityEventsSection.svelte';
    import Header from '../Components/Header.svelte';
    import Footer from '../Components/Footer.svelte';
    import Meta from '../Components/Meta.svelte';

    let loginCheck;
    let winWidth = window.innerWidth;
    $: imgWidth = (winWidth > 1000) ? 440 : winWidth*0.44;
    $: cardWidth = (winWidth > 1000) ? 280 : winWidth*0.3;
    $: boxPadding = (winWidth > 1000) ? 30 : 0 ;

</script>

<Header bind:loginCheck={loginCheck} />
<div class="sections cover">
    <CoverSection imgWidth={imgWidth} {loginCheck} />
</div>
<div class="sections">
    <BrandStorySection>
        <h2 class="section-title">나만의 브랜드를 만들어가는 사람들을 만나보세요.</h2>
    </BrandStorySection>
</div>
<div class="sections">
    <TutorialSection imgWidth={imgWidth}>
        <h2 class="section-title">처음 오셨나요?</h2>
        <p class="section-description" style="max-width:{imgWidth*2}px;">당신의 브랜드를 만드는 공간, 스튜디오에 입장하세요. 새로운 사람들과 프로젝트 기회를 만드는 시작입니다.</p>
    </TutorialSection>
</div>
<div class="sections">
    <CommunityEventsSection>
        <h2 class="section-title">allius는 이런 커뮤니티입니다.</h2>
        <p class="section-description">allius 커뮤니티 이벤트에 참여하세요.</p>
    </CommunityEventsSection>
</div>
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

        &.cover {
            margin-top: 0;
        }

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