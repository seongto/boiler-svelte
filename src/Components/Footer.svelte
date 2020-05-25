<script>

</script>

<div class="footer">
    <p class="company-name">주식회사 리얼비즌</p>
    <p class="company-info">
        사업자 등록 번호 : 152-81-00668<br>
        주소 : 서울 강남구 학동로 343, B2 청년창업센터 2호<br>
        문의 : allius@realwesen.com
    </p>
</div>

<style lang="scss">
    @import '../assets/scss/common.scss';

    .footer {
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0 30px 50px;
        color: $sub-color1;
        font-family: $font-kr;
        font-size: 16px;

        @include respond-to('w600') {
            padding: 0 12px 30px;
        }
        
        .company-name {
            border-top: 2px solid $sub-color1;
            padding-top: 20px;
            font-weight: 700;
        }

        .company-info {
            font-size: 0.8em;
        }
    }

</style>