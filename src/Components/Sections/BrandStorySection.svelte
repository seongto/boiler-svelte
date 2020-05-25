<script>
    import * as constants from '../../assets/js/constants.js';
    import { onMount } from 'svelte';

    let brStroies = [
        {
            "name" : "박진규",
            "title" : "성장중人 비즈니스 디벨로퍼",
            "description" : "외부 환경에 나의 시간을 맡기지 않고, 스스로 미래를 만드는 삶을 사는 중입니다. 금융, 컨설팅, 전략 업무와 유니콘 스타트업에 대한 Case Study 콘텐츠를 쌓으면서 얻은 인사이트를 비즈니스로 풀어냅니다.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "최보미",
            "title" : "잘 들리게 포장합니다",
            "description" : "잘 전달하기 위해 벗기기도 하고, 입히기도 하고, 뜯어보기도 하고, 해체하기도 합니다. 포장이라 했지만, 실은 언박싱 전문인 듯 합니다. 목넘김이 좋은 글을 씁니다.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "장정은",
            "title" : "스타트업 해결사",
            "description" : "스타트업이 성장하는 과정에서 직면하는 다양한 리스크를 관리하여 안전하게 성장할 수 있도록 합니다. 스타트업의 성장을 막는 불필요하고 불합리한 규제를 개선하고 제도를 만들어가고 싶습니다.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "오하니",
            "title" : "향수 읽어주는 여자",
            "description" : "\"왜 우리들에게 편안한 향은 없을까?\" 향기는 기억과 감정의 영향을 받습니다. 한국의 문화와 한국인의 감성으로 한국의 향을 만들고 세계에 한국을 이야기하고 싶습니다.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "신재욱",
            "title" : "시험을 당하는 자",
            "description" : "배움을 갈구하고 성장을 목표로 합니다. 스타트업을 하며 끊임없이 마주하는 모험과 시험을 잘 이겨내고 싶습니다.",
            "link" : "https://blog.allius.io",
        },
    ];

    export let cardWidth = 200;

    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    } 

    function clickToLink(target) {
        window.open(target);
    }

    onMount(() => {
        brStroies = brStroies.sort(mixArray);
    });

</script>

<div class="brand-story-wrapper">
    <slot></slot>
    <ul>
        {#each brStroies as item}
            <li on:click={() => clickToLink(item["link"])} style="width:{cardWidth}px; height:{cardWidth}px;">
                <span>{item["name"]}</span>
                <h3>{item["title"]}</h3>
                <p>{item["description"]}</p>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .brand-story-wrapper {
        width: 100%;
        
        ul {
            width: auto;
            margin-top: 30px;
            overflow-x : auto;
            display: flex;
            flex-wrap: nowrap;

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                flex: 0 0 auto;
                display: block;
                border : 1px solid black;
                border-radius : 8px;
                padding: 20px;
                height: 240px;
                margin-right: 15px;
                overflow: hidden;
                min-width: 240px; 
                min-height: 240px;

                &:hover {
                    cursor: pointer;
                }

                &:last-child {
                    margin-right: 0;
                }

                span {
                    font-size: 0.6em;
                    color: $theme-color1;
                    display: block;
                }

                h3 {
                    font-size: 1em;
                    margin-bottom: 5px;
                }

                p{
                    font-size: 0.7em;
                }
            }
        }
    }


</style>

