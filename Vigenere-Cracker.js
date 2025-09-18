(function(){
    function vigenereDecrypt(cipher, key){
    if(!key) return 'Please enter a key.';
    // prepare key: only letters, uppercase
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g,'');
    if(cleanKey.length === 0) return 'Key must contain at least one A–Z letter.';
    
    
    let result = '';
    let kIdx = 0;
    for(let i=0;i<cipher.length;i++){
    const ch = cipher[i];
    const code = cipher.charCodeAt(i);
    // uppercase letters
    if(code >= 65 && code <= 90){
    const shift = cleanKey.charCodeAt(kIdx % cleanKey.length) - 65; // 0..25
    const dec = (code - 65 - shift + 26) % 26 + 65;
    result += String.fromCharCode(dec);
    kIdx++;
    }
    // lowercase letters
    else if(code >= 97 && code <= 122){
    const shift = cleanKey.charCodeAt(kIdx % cleanKey.length) - 65; // key is uppercase
    const dec = (code - 97 - shift + 26) % 26 + 97;
    result += String.fromCharCode(dec);
    kIdx++;
    }
    else {
    // preserve punctuation / spaces / digits
    result += ch;
    }
    }
    return result;
    }
    
    
    const cipherEl = document.getElementById('cipher');
    const keyEl = document.getElementById('key');
    const out = document.getElementById('plain');
    const btn = document.getElementById('decodeBtn');
    
    
    function decodeAndShow(){
    const c = cipherEl.value || '';
    const k = keyEl.value || '';
    out.textContent = vigenereDecrypt(c, k);
    }
    
    
    btn.addEventListener('click', decodeAndShow);
    // allow Ctrl+Enter in either field
    [cipherEl, keyEl].forEach(el=>el.addEventListener('keydown', (e)=>{
    if((e.ctrlKey || e.metaKey) && e.key === 'Enter') decodeAndShow();
    }));
    })();