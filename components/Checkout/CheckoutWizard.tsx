import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    display: flex;
    align-items: flex-start;
    .activeStep {
        padding: 1em;
        border-bottom: 3px solid gray;
    }
    .active {
        border-bottom: 3px solid violet;
    }
    

`
export const CheckoutWizard = ({ activeStep = 0 }): JSX.Element => {
    return (
        <Container>
            {['Logowanie użytkownika', 'Adres dostawy', 'Metody płatności', 'Finalizacja zamówienia'].map(
                (step, i) => (
                    <div
                        key={step}
                        className={`activeStep ${i <= activeStep
                        ? 'active'
                        : 'disable'
                        }`}
                    >
                        {step}
                    </div>
                )
            )}
        </Container>
    )
}