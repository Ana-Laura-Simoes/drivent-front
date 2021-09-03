import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;

  h2 {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 17px;
  }

  .PaymentForm {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .rccs {
      margin: 0;
    }

    form {
      display: flex;
      flex-direction: column;
      color: #cecece;
      width: 100%;

      .wrapper {
        display: flex;

        .inputWrapper {
          margin-left: 30px;

          input {
            border: 1px solid #929292;
            outline: none;
            border-radius: 5px;
            padding: 10px;
            margin: 5px;
            font-size: 18px;

            ::placeholder {
              color: #929292;
            }

            ::-webkit-outer-spin-button,
            ::-webkit-inner-spin-button {
              display: none;
            }
          }

          .long {
            width: 85%;
          }

          .medium {
            width: 53%;
          }

          .short {
            width: 30%;
          }
        }
      }

      h2 {
        font-size: 16px;
        margin-left: 15px;
        margin-bottom: 5px;
      }

      button {
        display: flex;
        align-items: center;
        text-align: center;
        color: black;
        font-size: 14px;
        width: 182px;
        height: 37px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        border: none;
        outline: none;
        margin-top: 45px;
      }
    }
  }
`;

export const TicketHolder = styled.div`
  padding: 36px 55px 29px 55px;
  background-color: #ffeed2;
  border-radius: 20px;
  width: 290px;
  height: 108px;
  text-align: center;
  justify-content: center;
  align-items: center;

  h2 {
    font-size: 14px;
    color: #898989;
    margin-top: 8px;
  }
`;
