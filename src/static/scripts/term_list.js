window.onload = generateTermList()

async function generateTermList() {
  const terms = await fetchTempTermData()
  const termCardHTMLs = []

  terms.forEach((term) => {
    if (term.equivalent_word !== undefined) {
      termCardHTMLs.push(`
        <article class="term-card">
          <div class="pair-line">
            <a href="/term-detail.html" class="unstyled-link"><h3 class="word-pair">${term.word_en} - ${term.word_ka}</h3></a>
            <span class="equivalent-word">= <a href="/">${term.equivalent_word}</a></span>
          </div>
        </article>
        `)
      return
    }
    termCardHTMLs.push(
      `<article class="term-card">
			  <div class="field">
				${term.fields
          .map((field) => {
            if (field.type == 'list') {
              return field.list
                .map((field) => `<a href="${field.link}">${field.value}</a>`)
                .join(', ')
            }
            return `<a href="${field.link}">${field.value}</a>`
          })
          .join(' > ')}
			  </div>
				<a href="/term-detail.html" class="unstyled-link"><h3 class="word-pair">${term.word_en} - ${term.word_ka}</h3></a>
				<span class="word-type">${term.type}</span>
				<p class="term-source"><span class="term-source-label">ტერმინის წყარო: </span>${term.source}</p>
				<section class="term-controls">
					<button class="term-button tooltip" data-tooltip="${term.definition ? 'განმარტების ჩვენება' : 'განმარტება ამ ტერმინს არ აქვს'}" id="definition-button-${term.id}" ${!term.definition ? 'disabled' : ''}>
						<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-outline">
							<path d="M11.8244 1.03339C9.04615 1.31966 6.58236 2.45066 4.6301 4.33253C3.55072 5.37905 2.82332 6.36457 2.18508 7.65043C1.58907 8.84713 1.21364 10.0532 1.02592 11.3766C0.908598 12.2073 0.903905 13.8686 1.02123 14.6382C1.13386 15.3703 1.34504 16.2291 1.57969 16.9378C1.81433 17.6229 2.42911 18.8853 2.83739 19.5142L3.12836 19.96L2.69661 21.5509C2.41034 22.6162 2.27894 23.1887 2.29771 23.2732C2.33056 23.4187 2.48073 23.5736 2.64029 23.6252C2.71538 23.6487 3.27384 23.5173 4.35791 23.2263L5.96758 22.7945L6.36179 23.0527C9.23387 24.9204 12.716 25.4695 16.0527 24.5919C17.5873 24.1883 19.197 23.3624 20.4922 22.3206C21.0601 21.8653 22.055 20.8376 22.4914 20.2557C23.1907 19.3312 23.8101 18.1955 24.2137 17.1067C25.1476 14.5772 25.1664 11.5925 24.256 8.9973C23.9321 8.0728 23.1062 6.49128 22.7636 6.13931C22.5759 5.9469 22.3131 5.9469 22.1207 6.13931C21.9001 6.35987 21.9283 6.53351 22.2755 7.0732C23.5755 9.11463 24.1715 11.569 23.9509 13.9812C23.5098 18.8712 19.915 22.8696 15.1094 23.8317C13.9737 24.0569 12.5236 24.1086 11.4489 23.9584C9.69378 23.7097 8.21081 23.1512 6.73253 22.1704C6.44157 21.978 6.1553 21.8184 6.10368 21.8184C6.04736 21.8184 5.44197 21.9686 4.74742 22.1516C4.05756 22.3393 3.48033 22.4754 3.46156 22.4613C3.44748 22.4426 3.58357 21.8653 3.77129 21.1755C3.95431 20.4809 4.10449 19.8755 4.10449 19.8239C4.10449 19.7676 3.94962 19.4907 3.75721 19.1997C3.1659 18.3175 2.80924 17.6042 2.48073 16.6421C1.7721 14.5819 1.68293 12.3762 2.22731 10.2269C2.42911 9.43375 2.66845 8.79082 3.07204 7.99771C3.66335 6.82447 4.19835 6.08299 5.13224 5.15848C6.76538 3.53473 8.78804 2.47882 11.0266 2.0893C13.725 1.62001 16.4704 2.1597 18.7887 3.60981C19.3988 3.99463 19.5583 4.02279 19.7836 3.80223C19.976 3.60981 19.976 3.34701 19.7836 3.15929C19.4316 2.81671 17.8501 1.99075 16.9256 1.66694C16.2639 1.43699 15.4145 1.2258 14.6871 1.11786C13.9784 1.00993 12.472 0.962997 11.8244 1.03339Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
							<path d="M20.8489 4.44025C20.6096 4.59512 20.5579 4.99402 20.755 5.17704C20.9709 5.36945 21.3698 5.30375 21.4965 5.05033C21.7077 4.65144 21.2243 4.19622 20.8489 4.44025Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
							<path d="M12.0545 5.34624C10.5059 5.62781 9.1496 6.69311 8.53483 8.11038C8.44566 8.31687 8.3518 8.58906 8.32834 8.72046C8.16409 9.59335 8.87741 10.4334 9.78315 10.4334C10.4167 10.4334 10.8578 10.119 11.1723 9.45256C11.4257 8.90818 11.6697 8.63129 12.0733 8.43419C12.3596 8.2934 12.4206 8.27932 12.8336 8.27932C13.2278 8.27932 13.3122 8.2934 13.5469 8.41072C13.9082 8.58906 14.34 9.05366 14.4761 9.41501C14.6075 9.76698 14.5934 10.3677 14.4432 10.7056C14.2978 11.0294 13.9552 11.3673 13.5187 11.616C12.979 11.9257 12.6365 12.212 12.2892 12.6438C11.6979 13.3759 11.4069 14.169 11.4022 15.0606C11.4022 15.5393 11.4163 15.6238 11.5195 15.835C11.8715 16.553 12.7491 16.8627 13.4671 16.5248C13.9646 16.2855 14.2649 15.849 14.3165 15.2859C14.3306 15.1263 14.3635 14.9198 14.3916 14.8307C14.462 14.6007 14.7295 14.3285 15.1049 14.1126C16.25 13.4462 17.0572 12.4185 17.3951 11.1796C17.5359 10.668 17.5453 9.38216 17.4139 8.8894C17.1792 8.0259 16.7428 7.28442 16.0858 6.65557C15.6071 6.19566 15.3865 6.0361 14.8703 5.77329C14.2274 5.44948 13.7628 5.33685 12.9743 5.31808C12.5989 5.31339 12.1859 5.32277 12.0545 5.34624ZM13.9364 6.39745C14.5371 6.59925 14.9642 6.86675 15.4428 7.34074C15.9356 7.82411 16.2406 8.30748 16.433 8.8894C16.6067 9.42909 16.6395 10.2691 16.4987 10.8464C16.2547 11.8788 15.6493 12.6907 14.7013 13.2538C14.1382 13.587 14.0162 13.6903 13.7862 13.9953C13.5703 14.2957 13.3967 14.765 13.3967 15.0653C13.3967 15.3046 13.2982 15.544 13.1574 15.6425C13.0964 15.6848 12.9556 15.7176 12.8429 15.7176C12.6693 15.7176 12.6083 15.6895 12.4769 15.5581C12.3267 15.4079 12.3173 15.3797 12.3173 15.0982C12.3173 14.0469 12.9368 13.0614 13.988 12.4326C14.6263 12.0524 14.9735 11.7099 15.2223 11.2124C15.4569 10.7384 15.5226 10.4193 15.4991 9.85615C15.4569 8.98326 15.0392 8.26055 14.2931 7.76779C13.8378 7.46744 13.5 7.35481 12.9743 7.33135C12.4581 7.30319 12.0921 7.37828 11.6134 7.60823C11.1863 7.81472 10.656 8.35441 10.4495 8.79555C10.3651 8.97388 10.2712 9.17567 10.2384 9.24137C10.2055 9.30708 10.0976 9.40093 9.99902 9.44786C9.83008 9.52764 9.79723 9.53234 9.62828 9.47133C9.20592 9.32115 9.1496 8.99734 9.44995 8.38257C9.96617 7.30788 10.9611 6.53355 12.1343 6.28482C12.2469 6.26136 12.6177 6.24728 12.9509 6.25667C13.4671 6.27075 13.622 6.28952 13.9364 6.39745Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
							<path d="M12.5615 17.787C11.4164 18.0123 10.9847 19.4389 11.8059 20.2649C12.1157 20.5746 12.3644 20.6685 12.8571 20.6685C13.2373 20.6685 13.303 20.6544 13.5329 20.5277C14.2181 20.1475 14.5044 19.3404 14.1946 18.6458C14.0867 18.3971 13.8098 18.0873 13.5658 17.9466C13.4062 17.8574 12.8947 17.7213 12.7914 17.7401C12.7774 17.7448 12.6741 17.7635 12.5615 17.787ZM13.1528 18.8007C13.2138 18.8382 13.2936 18.9461 13.3358 19.04C13.4813 19.392 13.2326 19.7533 12.8337 19.7533C12.6741 19.7533 12.6084 19.7252 12.477 19.5938C12.0171 19.1339 12.599 18.4534 13.1528 18.8007Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
						</svg>
					</button>
					<button class="term-button tooltip" data-tooltip="${term.context ? 'კონტექსტის ჩვენება' : 'კონტექსტი ამ ტერმინს არ აქვს'}" id="context-button-${term.id}" ${!term.context ? 'disabled' : ''}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M2.56845 0.0739079C1.7758 0.284969 1.14731 0.946293 0.978463 1.76239C0.940941 1.94062 0.926871 4.89079 0.926871 12.0106C0.926871 22.9482 0.9128 22.3197 1.1989 22.8497C1.36775 23.1593 1.73359 23.5298 2.05253 23.7127C2.5966 24.0223 1.99156 24.0082 12.3476 23.9941L21.7281 23.9801L22.0001 23.8722C22.5911 23.633 23.1117 23.0936 23.3228 22.5026C23.4119 22.2587 23.4166 22.0899 23.4306 18.9381C23.44 16.607 23.4306 15.547 23.3931 15.35C23.2196 14.4495 22.4598 13.7225 21.5264 13.5818L21.1887 13.5255V10.7817C21.1887 7.74245 21.1699 7.45635 20.9073 6.73405C20.6024 5.8898 20.4946 5.75848 18.0744 3.32893C16.8596 2.10478 15.7293 1.00257 15.5604 0.875938C15.1805 0.585144 14.5286 0.261518 14.0361 0.12081L13.6609 0.0129356L8.2671 0.00355339C3.30482 -0.00582695 2.84987 -0.00113678 2.56845 0.0739079ZM13.295 1.49505C13.4311 1.56071 13.5389 1.65921 13.614 1.79053L13.7312 1.99222V3.69008C13.7312 5.6037 13.7594 5.83352 14.0408 6.30724C14.3456 6.81378 14.749 7.1421 15.2931 7.32033C15.5604 7.40944 15.734 7.41882 17.4365 7.44228C19.5049 7.47511 19.4299 7.46104 19.6503 7.81749L19.7582 7.98634L19.7723 10.763L19.7863 13.5443H18.5856H17.3896V12.2169C17.3896 11.2273 17.3709 10.8333 17.324 10.6739L17.263 10.4581L17.4928 10.4346C17.9337 10.3831 18.1635 10.1016 18.1307 9.66545C18.1166 9.48722 18.0791 9.38403 17.9947 9.29492C17.7461 9.02758 18.1823 9.04165 11.0578 9.04165C5.15278 9.04165 4.468 9.05103 4.3273 9.11669C3.78792 9.36996 3.86765 10.2423 4.43986 10.4018C4.54774 10.43 6.20808 10.4487 8.86745 10.4487C12.9011 10.4487 13.1262 10.4534 13.1027 10.5285C13.0183 10.8146 12.9808 11.096 12.9808 11.5369V12.0434L8.69391 12.0528C4.44455 12.0669 4.40234 12.0669 4.2757 12.1653C4.04119 12.3389 3.96615 12.4843 3.96615 12.7469C3.96615 13.0237 4.05057 13.1737 4.30384 13.3473L4.45862 13.4505H8.71736H12.9808V15.1577V16.8697L12.5446 16.6633C12.0052 16.4053 11.6206 16.3115 11.1047 16.3115C10.3683 16.3115 9.68355 16.5789 9.15824 17.0713C8.66108 17.531 8.4594 18.0985 8.56727 18.6895C8.67515 19.2664 8.7455 19.3555 10.4152 21.0393L11.9677 22.5964H7.47914C3.76916 22.5964 2.96244 22.5871 2.8358 22.5308C2.65288 22.4557 2.4512 22.2447 2.38554 22.0664C2.31518 21.8788 2.31518 2.11416 2.38554 1.92655C2.4512 1.75301 2.65288 1.54195 2.82642 1.46222C2.93898 1.41063 3.90517 1.40125 8.02789 1.39655C13.0746 1.39655 13.0934 1.39655 13.295 1.49505ZM17.4037 6.03051C15.6495 6.04458 15.4525 6.00237 15.2368 5.5568C15.143 5.3645 15.1383 5.28008 15.1383 3.87769V2.40496L16.944 4.2107L18.7498 6.01644L17.4037 6.03051ZM15.6402 10.5707C15.7105 10.6223 15.809 10.7254 15.8606 10.7958C15.9544 10.9177 15.9591 10.9975 15.9825 12.7C16.006 14.4073 16.0107 14.4823 16.1045 14.609C16.1561 14.6793 16.2733 14.7872 16.3578 14.8435L16.5125 14.9513H18.9327C21.6577 14.9513 21.6014 14.9467 21.8735 15.3078L22.0095 15.4813L22.0236 18.6519C22.033 20.3967 22.0236 21.8929 22.0095 21.9773C21.9767 22.1649 21.7328 22.451 21.5311 22.5308C21.4092 22.5824 20.6822 22.5964 17.6851 22.5964H13.9892L11.9583 20.5656C10.3074 18.9146 9.93213 18.5159 9.93213 18.4127C9.93213 18.2439 10.1104 18.0469 10.4105 17.8827C10.6357 17.7561 10.6966 17.742 11.1047 17.742H11.5503L12.5352 18.2251C13.3279 18.6144 13.5624 18.7082 13.7265 18.7082C13.947 18.7129 14.1018 18.6238 14.2659 18.4034C14.3644 18.2767 14.3644 18.2204 14.3879 14.6324L14.4113 10.9881L14.5192 10.8146C14.7349 10.4675 15.3259 10.3408 15.6402 10.5707Z" fill="#070707"/>
							<path d="M4.42104 3.04292C4.00361 3.16487 3.83007 3.73239 4.08803 4.12637C4.27095 4.40778 4.14432 4.3984 8.07005 4.3984H11.6534L11.8129 4.29053C12.0192 4.15451 12.1599 3.8215 12.1177 3.5823C12.0755 3.35717 11.841 3.0992 11.6299 3.03823C11.4142 2.98195 4.62272 2.98195 4.42104 3.04292Z" fill="#070707"/>
							<path d="M4.27156 6.13352C3.84944 6.3868 3.8682 7.07157 4.30439 7.32954C4.46386 7.41865 4.53891 7.42334 6.90748 7.42334C9.27605 7.42334 9.35109 7.41865 9.51056 7.32954C9.95144 7.06688 9.9702 6.39149 9.54339 6.13352C9.398 6.04441 9.29012 6.03972 6.90748 6.03972C4.52484 6.03972 4.41696 6.04441 4.27156 6.13352Z" fill="#070707"/>
							<path d="M4.40267 15.106C3.98524 15.2608 3.83046 15.8002 4.09311 16.1989C4.24789 16.4381 4.35108 16.4521 6.16151 16.4521C7.59672 16.4521 7.85469 16.4428 7.9907 16.3771C8.45504 16.1567 8.45973 15.4015 8.00008 15.153C7.85938 15.0779 7.68584 15.0685 6.20372 15.0591C4.98895 15.0545 4.51993 15.0638 4.40267 15.106Z" fill="#070707"/>
						</svg>
					</button>
					<button class="term-button tooltip" data-tooltip="${term.connected_terms || term.synonyms ? 'დაკავშირებული სიტყვების და სინონიმების ჩვენება' : 'დაკავშირებული სიტყვები და სინონიმები ამ ტერმინს არ აქვს'}" id="connected-button-${term.id}" ${!term.connected_terms && !term.synonyms ? 'disabled' : ''}>
						<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20.6104 1.04405C19.9397 1.17716 19.4328 1.42292 18.972 1.84787C18.7212 2.07826 18.3576 2.60561 18.204 2.95376L18.1119 3.1688L11.8349 3.18928C4.94868 3.20976 5.43507 3.18416 4.43157 3.51695C2.80345 4.05454 1.51836 5.12459 0.898858 6.466C0.125756 8.13508 0.330551 10.1984 1.40573 11.6576C2.09179 12.5945 3.21304 13.3625 4.46741 13.7669C5.48115 14.0895 5.23028 14.0793 12.1677 14.0793C16.366 14.0793 18.6136 14.0997 18.8799 14.1356C19.4021 14.2073 20.2878 14.4991 20.6923 14.7397C21.6497 15.2927 22.1976 16.1528 22.259 17.1768C22.346 18.6769 21.5064 19.8084 19.8936 20.3614C19.0744 20.6429 19.3151 20.6327 12.8026 20.6327H6.76624L6.628 20.3204C6.24401 19.4654 5.44019 18.8049 4.48277 18.5592C4.0527 18.4516 3.3308 18.4619 2.84953 18.5848C1.26749 18.9892 0.243513 20.5149 0.463668 22.1482C0.571185 22.9674 0.847659 23.5357 1.40573 24.0886C2.02523 24.6979 2.77785 25 3.68919 25C4.80533 25.0051 5.78834 24.4931 6.36689 23.6125C6.48977 23.423 6.628 23.1773 6.66896 23.0646L6.75088 22.8599L13.0381 22.8291C18.7365 22.8035 19.3663 22.7933 19.6888 22.7165C23.0679 21.8922 24.8701 19.4654 24.3684 16.4088C24.0612 14.5247 22.5355 12.917 20.421 12.2412C19.4021 11.9187 19.653 11.9289 12.7207 11.9289C8.52236 11.9289 6.27473 11.9084 6.0085 11.8726C5.48627 11.8009 4.60053 11.5091 4.19606 11.2684C3.23864 10.7155 2.69082 9.85536 2.62938 8.83138C2.57818 7.90981 2.84441 7.1879 3.4588 6.57864C3.88375 6.15881 4.24214 5.93353 4.86676 5.69802C5.77298 5.36011 5.43507 5.37547 12.0858 5.37547H18.117L18.2706 5.6929C18.6904 6.58888 19.4482 7.20326 20.4312 7.45414C20.8766 7.56677 21.7572 7.53094 22.2232 7.37734C23.2574 7.04455 24.0663 6.18441 24.353 5.11947C24.4657 4.68428 24.4708 3.87534 24.3581 3.42991C24.0663 2.30354 23.1601 1.38196 22.0593 1.10549C21.6139 0.992849 21.0149 0.967249 20.6104 1.04405ZM21.5627 3.23536C21.8545 3.33263 22.0235 3.48623 22.1515 3.75758C22.3665 4.22349 22.2897 4.70476 21.9467 5.04779C21.4501 5.54954 20.5387 5.42155 20.2264 4.81228C19.9192 4.19789 20.1752 3.46063 20.7691 3.25072C21.0149 3.16368 21.3323 3.15344 21.5627 3.23536ZM4.22166 20.7709C4.67221 20.9962 4.877 21.4724 4.75925 22.0202C4.61589 22.6909 3.86327 23.0237 3.19768 22.7114C2.5577 22.4144 2.40922 21.5338 2.90585 20.986C3.21304 20.6481 3.79159 20.5508 4.22166 20.7709Z" fill="#070707" stroke="#FDFDFD" stroke-width="0.5"/>
						</svg>
					</button>
					<button class="term-button tooltip" data-tooltip="${term.comment ? 'კომენტარის ჩვენება' : 'კომენტარი ამ ტერმინს არ აქვს'}" id="comment-button-${term.id}" ${!term.comment ? 'disabled' : ''}>
						<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-outline">
							<path d="M20.4858 1.09296C20.1179 1.18729 19.9481 1.26746 19.6227 1.4844C19.4152 1.62116 8.66732 12.3125 8.48811 12.5624C8.38907 12.6992 6.93652 17.8539 6.93652 18.0708C6.93652 18.3349 7.24307 18.6367 7.51188 18.6367C7.71939 18.6367 12.8788 17.1795 13.0108 17.0851C13.0816 17.0333 15.5716 14.5573 18.5475 11.5768C22.4948 7.62471 24.004 6.08256 24.1454 5.8609C24.4944 5.31384 24.6406 4.58757 24.5322 3.94147C24.4991 3.75754 24.3907 3.44628 24.2822 3.21519C24.1124 2.85677 24.0228 2.7483 23.4239 2.14936C22.8249 1.55042 22.7165 1.46553 22.358 1.29104C21.7214 0.984495 21.1319 0.923187 20.4858 1.09296ZM21.8534 2.37573C22.1128 2.50307 23.0702 3.46514 23.2117 3.73396C23.306 3.91317 23.3248 4.01692 23.3248 4.39421C23.3248 4.96485 23.24 5.14878 22.7023 5.70999L22.3156 6.11557L20.8866 4.6866L19.4577 3.25764L19.8727 2.86149C20.1038 2.64455 20.382 2.42289 20.4952 2.3663C20.9055 2.16823 21.4526 2.17294 21.8534 2.37573ZM20.0472 5.54964L21.4384 6.94088L17.0383 11.3363L12.643 15.7363L11.2517 14.3451C10.4877 13.5811 9.86048 12.935 9.86048 12.9067C9.86048 12.8454 18.5475 4.15841 18.6088 4.15841C18.6371 4.15841 19.2832 4.78564 20.0472 5.54964ZM11.4545 16.3211C11.28 16.3777 8.42208 17.1653 8.41265 17.1606C8.40794 17.1559 8.55413 16.6182 8.73334 15.9721C8.91255 15.3213 9.10591 14.6281 9.16251 14.4206L9.26154 14.0527L10.384 15.1751C11.0065 15.7976 11.4828 16.3117 11.4545 16.3211Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
							<path d="M2.69228 3.43203C1.70662 3.69613 0.947335 4.40354 0.598346 5.38448L0.452148 5.78535V14.1564C0.452148 22.1407 0.456865 22.5415 0.537038 22.8056C0.711532 23.3715 0.900174 23.6875 1.32462 24.112C1.62173 24.4091 1.81509 24.56 2.06504 24.6826C2.75359 25.0269 2.07919 25.008 12.0301 24.9939L20.967 24.9797L21.283 24.8571C22.2121 24.494 22.8676 23.829 23.1741 22.9282C23.2779 22.6264 23.2779 22.5792 23.292 19.5798C23.3062 16.8492 23.3015 16.5238 23.2307 16.3918C23.1317 16.2031 22.9289 16.0899 22.6931 16.0899C22.5375 16.0899 22.462 16.123 22.3205 16.2503L22.146 16.4106L22.1225 19.4006C22.0989 22.3765 22.0989 22.3859 21.9904 22.6547C21.797 23.1357 21.4339 23.4989 20.9529 23.6922L20.6841 23.8007L12.0348 23.8149C6.32365 23.8196 3.29593 23.8101 3.12144 23.7771C2.55551 23.6734 2.05089 23.2867 1.81509 22.7726L1.67832 22.4802V14.1799V5.87967L1.81509 5.58256C1.98958 5.20527 2.39045 4.82327 2.77245 4.66764L3.04598 4.55917L6.0171 4.53559C9.33721 4.50729 9.14857 4.53087 9.31835 4.17245C9.42682 3.94608 9.37966 3.72443 9.17215 3.52164L9.00709 3.35657L5.97937 3.36129C3.46571 3.36129 2.90922 3.37544 2.69228 3.43203Z" fill="#070707" stroke="#070707" stroke-width="0.5"/>
						</svg>
					</button>
					<button class="term-button toggle-all-button tooltip" data-tooltip="${!isAllMissing(term) ? 'ყველაფრის ჩვენება/დამალვა' : 'დამატებითი ინფორმაცია ამ ტერმინს არ აქვს'}" id="all-button-${term.id}" ${isAllMissing(term) ? 'disabled' : ''}>
						<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.6405 0.0692673C10.5492 0.106858 10.3398 0.294813 10.1787 0.482769C9.43226 1.34199 6.83847 4.53186 6.79551 4.65001C6.66126 5.00444 6.80088 5.45016 7.11772 5.66496C7.35938 5.83144 7.76751 5.84218 8.01454 5.69182C8.1112 5.63274 8.61599 5.06888 9.14227 4.42983L10.1035 3.27525L10.1304 5.97106C10.1572 8.54337 10.1626 8.67225 10.2646 8.84409C10.4204 9.10186 10.6781 9.24149 10.9896 9.24149C11.3011 9.24149 11.5588 9.10186 11.7146 8.84409C11.8166 8.67225 11.822 8.54337 11.8488 5.97106L11.8757 3.27525L12.8155 4.4352C13.331 5.06888 13.8304 5.62737 13.9163 5.67571C14.1419 5.79385 14.5285 5.78311 14.7541 5.65422C14.9796 5.51997 15.1783 5.18702 15.1783 4.92925C15.1783 4.82185 15.1246 4.63927 15.0602 4.52112C14.9904 4.40298 14.1687 3.37191 13.229 2.23344C11.7951 0.493509 11.489 0.149819 11.3064 0.0800076C11.054 -0.0220251 10.8553 -0.0273952 10.6405 0.0692673Z" fill="#070707"/>
							<path d="M1.13553 11.1318C0.775728 11.2875 0.571662 11.701 0.646844 12.1038C0.695176 12.3562 0.963683 12.6515 1.20534 12.7213C1.34496 12.7643 4.38984 12.775 11.0542 12.7643L20.7044 12.7482L20.8494 12.6354C21.134 12.426 21.2199 12.2541 21.2199 11.9158C21.2199 11.5775 21.134 11.4057 20.8494 11.1962L20.7044 11.0834L11.0005 11.0727C3.01508 11.062 1.26978 11.0727 1.13553 11.1318Z" fill="#070707"/>
							<path d="M10.6137 14.8748C10.458 14.9392 10.2539 15.1218 10.168 15.2722C10.1196 15.3473 10.0982 16.169 10.0767 18.0593L10.0498 20.739L9.08858 19.6005C8.56231 18.9722 8.05751 18.4083 7.96085 18.3546C7.74604 18.215 7.2681 18.2365 7.05866 18.3868C6.73108 18.6339 6.60757 19.1011 6.77405 19.4501C6.90293 19.7133 10.2915 23.7355 10.5009 23.8751C10.748 24.0416 11.1239 24.0416 11.3709 23.8751C11.5803 23.7355 14.9689 19.7133 15.0978 19.4501C15.2643 19.1011 15.1407 18.6339 14.8132 18.3868C14.6037 18.2365 14.1258 18.215 13.9056 18.3546C13.8143 18.4137 13.2988 18.9829 12.7671 19.622L11.8005 20.7819L11.7844 18.07C11.7683 15.4279 11.7629 15.3581 11.6555 15.2131C11.5964 15.1325 11.4837 15.0144 11.4085 14.9607C11.242 14.8372 10.8124 14.7888 10.6137 14.8748Z" fill="#070707"/>
						</svg>
					</button>
				</section>

				${
          term.definition
            ? `<section class="term-group" id="definition-${term.id}">
					<h4 class="term-group-title">განმარტება</h4>
					<p class="term-group-text">${term.definition}</p>
					<div class="term-group-sources">
						<span class="context-label">განმარტების წყარო:</span>
						${term.definition_sources
              .map(
                (source) => `<div class="term-context-source">${source}</div>`
              )
              .join('')}
					</div>
				</section>`
            : ''
        }
				${
          term.context
            ? `<section class="term-group" id="context-${term.id}">
					<h4 class="term-group-title">კონტექსტი</h4>
					<p class="term-group-text">${term.context}</p>
					<div class="term-group-sources">
						<span class="context-label">კონტექსტის წყარო:</span>
						${term.context_sources
              ?.map(
                (source) => `<div class="term-context-source">${source}</div>`
              )
              .join('')}
					</div>
				</section>`
            : ''
        }
				<section class="term-group nested-term-group" id="connected-${term.id}">
						${
              term.synonyms
                ? `<div>
										<h4 class="term-group-title">სინონიმები</h4>
										<div>
											${term.synonyms
                        .map(
                          (synonym) =>
                            `<a href="${synonym.link}">${synonym.value}</a>`
                        )
                        .join(', ')}
										</div>
									</div>`
                : ''
            }
					${
            term.connected_terms
              ? `<div>
									<h4 class="term-group-title">დაკავშირებული სიტყვები</h4>
									<div>
										${term.connected_terms
                      .map((term) => `<a href="${term.link}">${term.value}</a>`)
                      .join(', ')}
									</div>
								</div>`
              : ''
          }
				</section>
				<section class="term-group" id="comment-${term.id}">
					<h4 class="term-group-title">კომენტარი</h4>
					<p class="term-group-text">${term.comment}</p>
				</section>
			</article>
    `
    )
  })

  const termList = document.querySelector('#term-list')
  const termCardTemplate = document.createElement('template')

  termCardTemplate.innerHTML = termCardHTMLs.join('')
  termList.appendChild(termCardTemplate.content.cloneNode(true))

  const termButtons = Array.from(
    document.querySelectorAll('.term-button')
  ).filter((el) => !el.disabled)

  termButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const termGroupId = button.id.replace('button-', '')

      if (termGroupId.startsWith('all-')) {
        let isAllOpen = true
        const buttonIds = []

        ;['definition', 'context', 'connected', 'comment'].forEach((group) => {
          const newButtonId = termGroupId.replace('all', group + '-button')
          const button = document.getElementById(newButtonId)

          if (button.disabled) {
            return
          }

          if (!button.classList.contains('active')) {
            isAllOpen = false
          }

          buttonIds.push(newButtonId)
        })

        buttonIds.forEach((buttonId) => toggleGroupActive(buttonId, !isAllOpen))
      } else {
        toggleGroupActive(button.id)
      }
      let isAllOpen = true

      const currId = termGroupId.substring(termGroupId.indexOf('-') + 1)

      ;['definition', 'context', 'connected', 'comment'].forEach((group) => {
        const newButtonId = group + '-button-' + currId
        const button = document.getElementById(newButtonId)

        if (button.disabled) {
          return
        }

        if (!button.classList.contains('active')) {
          isAllOpen = false
        }
      })

      const allButton = document.getElementById(`all-button-${currId}`)

      if (isAllOpen) {
        allButton.innerHTML = `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2823 9.17222C11.3736 9.13463 11.583 8.94667 11.7441 8.75872C12.4906 7.89949 15.0844 4.70962 15.1273 4.59148C15.2616 4.23705 15.122 3.79133 14.8051 3.57652C14.5635 3.41005 14.1553 3.39931 13.9083 3.54967C13.8117 3.60874 13.3069 4.17261 12.7806 4.81166L11.8193 5.96624L11.7925 3.27042C11.7656 0.69812 11.7603 0.569236 11.6582 0.397391C11.5025 0.139624 11.2447 0 10.9333 0C10.6218 0 10.364 0.139624 10.2083 0.397391C10.1062 0.569236 10.1009 0.69812 10.074 3.27042L10.0472 5.96624L9.1074 4.80629C8.59186 4.17261 8.09244 3.61411 8.00652 3.56578C7.78097 3.44764 7.39432 3.45838 7.16877 3.58726C6.94323 3.72151 6.74453 4.05446 6.74453 4.31223C6.74453 4.41963 6.79823 4.60222 6.86268 4.72036C6.93249 4.83851 7.75412 5.86958 8.6939 7.00805C10.1277 8.74798 10.4338 9.09167 10.6164 9.16148C10.8688 9.26351 11.0675 9.26888 11.2823 9.17222Z" fill="#070707"/>
        <path d="M1.13553 11.1317C0.775728 11.2874 0.571662 11.7009 0.646844 12.1037C0.695176 12.3561 0.963683 12.6514 1.20534 12.7212C1.34496 12.7642 4.38984 12.7749 11.0542 12.7642L20.7044 12.7481L20.8494 12.6353C21.134 12.4259 21.2199 12.254 21.2199 11.9157C21.2199 11.5774 21.134 11.4055 20.8494 11.1961L20.7044 11.0833L11.0005 11.0726C3.01508 11.0619 1.26978 11.0726 1.13553 11.1317Z" fill="#070707"/>
        <path d="M11.2584 23.9568C11.4141 23.8923 11.6182 23.7097 11.7041 23.5594C11.7524 23.4842 11.7739 22.6626 11.7954 20.7723L11.8222 18.0926L12.7835 19.231C13.3098 19.8593 13.8146 20.4232 13.9112 20.4769C14.126 20.6165 14.604 20.5951 14.8134 20.4447C15.141 20.1977 15.2645 19.7305 15.098 19.3814C14.9691 19.1183 11.5806 15.096 11.3711 14.9564C11.1241 14.7899 10.7482 14.7899 10.5012 14.9564C10.2917 15.096 6.90317 19.1183 6.77429 19.3814C6.60781 19.7305 6.73133 20.1977 7.05891 20.4447C7.26834 20.5951 7.74629 20.6165 7.96646 20.4769C8.05776 20.4178 8.57329 19.8486 9.10494 19.2096L10.0716 18.0496L10.0877 20.7615C10.1038 23.4036 10.1092 23.4735 10.2166 23.6185C10.2756 23.699 10.3884 23.8171 10.4636 23.8708C10.6301 23.9944 11.0597 24.0427 11.2584 23.9568Z" fill="#070707"/>        
        </svg>`
      } else {
        allButton.innerHTML = `<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6405 0.0692673C10.5492 0.106858 10.3398 0.294813 10.1787 0.482769C9.43226 1.34199 6.83847 4.53186 6.79551 4.65001C6.66126 5.00444 6.80088 5.45016 7.11772 5.66496C7.35938 5.83144 7.76751 5.84218 8.01454 5.69182C8.1112 5.63274 8.61599 5.06888 9.14227 4.42983L10.1035 3.27525L10.1304 5.97106C10.1572 8.54337 10.1626 8.67225 10.2646 8.84409C10.4204 9.10186 10.6781 9.24149 10.9896 9.24149C11.3011 9.24149 11.5588 9.10186 11.7146 8.84409C11.8166 8.67225 11.822 8.54337 11.8488 5.97106L11.8757 3.27525L12.8155 4.4352C13.331 5.06888 13.8304 5.62737 13.9163 5.67571C14.1419 5.79385 14.5285 5.78311 14.7541 5.65422C14.9796 5.51997 15.1783 5.18702 15.1783 4.92925C15.1783 4.82185 15.1246 4.63927 15.0602 4.52112C14.9904 4.40298 14.1687 3.37191 13.229 2.23344C11.7951 0.493509 11.489 0.149819 11.3064 0.0800076C11.054 -0.0220251 10.8553 -0.0273952 10.6405 0.0692673Z" fill="#070707"/>
        <path d="M1.13553 11.1318C0.775728 11.2875 0.571662 11.701 0.646844 12.1038C0.695176 12.3562 0.963683 12.6515 1.20534 12.7213C1.34496 12.7643 4.38984 12.775 11.0542 12.7643L20.7044 12.7482L20.8494 12.6354C21.134 12.426 21.2199 12.2541 21.2199 11.9158C21.2199 11.5775 21.134 11.4057 20.8494 11.1962L20.7044 11.0834L11.0005 11.0727C3.01508 11.062 1.26978 11.0727 1.13553 11.1318Z" fill="#070707"/>
        <path d="M10.6137 14.8748C10.458 14.9392 10.2539 15.1218 10.168 15.2722C10.1196 15.3473 10.0982 16.169 10.0767 18.0593L10.0498 20.739L9.08858 19.6005C8.56231 18.9722 8.05751 18.4083 7.96085 18.3546C7.74604 18.215 7.2681 18.2365 7.05866 18.3868C6.73108 18.6339 6.60757 19.1011 6.77405 19.4501C6.90293 19.7133 10.2915 23.7355 10.5009 23.8751C10.748 24.0416 11.1239 24.0416 11.3709 23.8751C11.5803 23.7355 14.9689 19.7133 15.0978 19.4501C15.2643 19.1011 15.1407 18.6339 14.8132 18.3868C14.6037 18.2365 14.1258 18.215 13.9056 18.3546C13.8143 18.4137 13.2988 18.9829 12.7671 19.622L11.8005 20.7819L11.7844 18.07C11.7683 15.4279 11.7629 15.3581 11.6555 15.2131C11.5964 15.1325 11.4837 15.0144 11.4085 14.9607C11.242 14.8372 10.8124 14.7888 10.6137 14.8748Z" fill="#070707"/>
      </svg>`
      }
    })
  })
}

function isAllMissing(term) {
  return (
    !term.definition &&
    !term.context &&
    !term.synonyms &&
    !term.connected_terms &&
    !term.comment
  )
}

function toggleGroupActive(buttonId, shouldOpen) {
  const button = document.getElementById(buttonId)
  const termGroup = document.getElementById(buttonId.replace('button-', ''))

  if (shouldOpen === undefined) {
    termGroup.classList.toggle('active')
    button.classList.toggle('active')
    return
  }

  if (shouldOpen && !button.classList.contains('active')) {
    termGroup.classList.add('active')
    button.classList.add('active')
  } else if (!shouldOpen && button.classList.contains('active')) {
    termGroup.classList.remove('active')
    button.classList.remove('active')
  }
}

async function fetchTempTermData() {
  const res = await fetch('../temp_data/terms.json')
  const data = await res.json()
  return data
}
