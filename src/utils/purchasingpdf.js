export const pdfHtml = arr => {
  return `<div
        style="
          display: flex;
          flex-direction: column;
          text-align: center;
          justify-content: space-evenly;
          align-items: center;
        ">
        <div style="width: 100vw; background-color: #11a79c">
          <p style="font-weight: bold; color: #fff; font-size: x-large">
            Purchasing List
          </p>
        </div>
        <div style="display: flex; flex-direction: row; width: 90vw">
        <div style="width: 10vw">
          <p style="font-weight: bold; font-size: large">Done</p>
        </div>
        <div style="width: 45vw; text-align: left; padding-left: 2vw">
          <p style="font-weight: bold; font-size: large">Item</p>
        </div>
        <div style="width: 18vw; align-items: center">
          <p style="font-weight: bold; font-size: large">Quantity</p>
        </div>
        <div style="width: 18vw; align-items: center">
          <p style="font-weight: bold; font-size: large">Amount</p>
        </div>
        </div>
        <div style="width: 90%; border: 1px solid black">
          <!-- <p>Hello</p> -->
        </div>
        ${arr
          .map(
            () => `<div
        style="
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90vw;
        height: 4vh;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: aliceblue;
        border-radius: 12px;
        box-shadow: 2px 2px 5px #11a79c;
      ">
      <div
      style="
        display: flex;
        width: 10vw;
        align-items: center;
        justify-content: center;
        height: 100%
      ">
      <div style="border: 2px solid #000; width: 20%; height: 35%" /></div>
    </div>
    <div style="width: 45vw; text-align: left; padding-left: 1vw">
      <p style="font-weight: bold">Chicken Biryani</p>
    </div>
    <div style="width: 18vw; align-items: center">
      <p style="font-weight: bold">2</p>
    </div>
    <div style="width: 18vw; align-items: center">
      <p style="font-weight: bold">Rs. 340</p>
    </div>
      </div>`,
          )
          .join(' ')}
          <div style="width: 90%; border: 1px solid black; margin-top: 10px">
          <!-- Line Separator -->
        </div>
        <div
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            width: 80%;
          ">
          <p style="font-weight: bold; font-size: large">Total</p>
          <p style="font-weight: bold; font-size: large">Rs. 4050</p>
        </div>
      </div>
      `;
};
