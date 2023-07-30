
function VampireDie({ hunger, value }) {
    value = Number(value);
    let image = hunger ? ['bestial-fail.png', 'red-fail.png', 'red-fail.png', 'red-fail.png', 'red-fail.png', 'red-success.png', 'red-success.png', 'red-success.png', 'red-success.png', 'red-crit.png'][value - 1] : ['normal-fail.png', 'normal-fail.png', 'normal-fail.png', 'normal-fail.png', 'normal-fail.png', 'normal-success.png', 'normal-success.png', 'normal-success.png', 'normal-success.png', 'normal-crit.png'][value - 1];

    return React.createElement('img', { className: ['die', hunger ? 'hunger' : null].join(' '), src: `images/${image}` });
}

function Display() {
    return React.createElement(
        'div',
        null,
        React.createElement(VampireDie, { hunger: true, value: '1' }),
        React.createElement(VampireDie, { hunger: true, value: '2' }),
        React.createElement(VampireDie, { hunger: true, value: '3' }),
        React.createElement(VampireDie, { hunger: true, value: '4' }),
        React.createElement(VampireDie, { hunger: true, value: '5' }),
        React.createElement(VampireDie, { hunger: true, value: '6' }),
        React.createElement(VampireDie, { hunger: true, value: '7' }),
        React.createElement(VampireDie, { hunger: true, value: '8' }),
        React.createElement(VampireDie, { hunger: true, value: '9' }),
        React.createElement(VampireDie, { hunger: true, value: '10' }),
        React.createElement(VampireDie, { value: '1' }),
        React.createElement(VampireDie, { value: '2' }),
        React.createElement(VampireDie, { value: '3' }),
        React.createElement(VampireDie, { value: '4' }),
        React.createElement(VampireDie, { value: '5' }),
        React.createElement(VampireDie, { value: '6' }),
        React.createElement(VampireDie, { value: '7' }),
        React.createElement(VampireDie, { value: '8' }),
        React.createElement(VampireDie, { value: '9' }),
        React.createElement(VampireDie, { value: '10' })
    );
}