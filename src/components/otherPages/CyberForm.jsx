// components/Cyberform.jsx
import { useEffect, useRef } from 'react';

export default function Cyberform({ onTokenCreated }) {
    const microformRef = useRef(null);

    useEffect(() => {
        async function initMicroform() {
            const res = await fetch('http://92.96.253.84:3000/payment/capture-context');
            const { captureContext } = await res.json();
            const payload = JSON.parse(atob(captureContext.split('.')[1]));
            const script = document.createElement('script');
            script.src = payload.ctx[0].data.clientLibrary;
            script.integrity = payload.ctx[0].data.clientLibraryIntegrity;
            script.crossOrigin = 'anonymous';
            script.onload = () => {
                const flex = new window.Flex(captureContext);
                const microform = flex.microform('card', {
                    styles: {
                        input: { color: '#333', fontSize: '16px' },
                        ':focus': { color: 'black' },
                        'valid': { color: 'green' },
                        'invalid': { color: 'red' }
                    }
                });

                const number = microform.createField('number', { placeholder: 'Card Number' });
                const cvv = microform.createField('securityCode', { placeholder: '•••' });

                number.load('#card-container');
                cvv.load('#cvv-container');

                microformRef.current = microform;
            };

            document.head.appendChild(script);
        }

        initMicroform();
    }, []);

    const handlePay = async () => {
        const expirationMonth = '10';
        const expirationYear = '2025';
        if (!microformRef.current) return alert('Microform not ready');

        microformRef.current.createToken({ expirationMonth, expirationYear }, (err, token) => {
            if (err) return alert(err.message);
            onTokenCreated(token.transientTokenJwt);
        });
    };

    return (
        <div>
            <div id="card-container" style={{ border: '1px solid #ccc', marginBottom: 10 }}></div>
            <div id="cvv-container" style={{ border: '1px solid #ccc' }}></div>
            <button onClick={handlePay}>Pay</button>
        </div>
    );
}
