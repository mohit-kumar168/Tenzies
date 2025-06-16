import React from 'react'

const Die = (props) => {
    const styles = {
        backgroundColor: props.isHeld ? '#59E391' : null,
    }
return (
    <button
        className="h-[60px] w-[60px] text-[1.6rem] font-semibold rounded-[10px] border-none bg-white shadow-[0_0_5px_rgba(0,0,0,0.2)] cursor-pointer"
        style={styles}
        onClick={props.hold}
    >
        {props.value}
    </button>
)
}

export default Die
