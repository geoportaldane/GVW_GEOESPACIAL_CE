import React from "react";
import { DialogTitle, Dialog, DialogContent, DialogActions, Button, Grid } from "@material-ui/core"
import { Warning } from "@material-ui/icons"


const Dialogo = (props) => {
    const { open, cerrarDialogo } = props;

    return (
        <Dialog open={open}>
            <DialogTitle>
                {/* <Grid container xs={12} direction="row"> */}
                    {/* <Grid xs={2}> */}
                        <Warning style={{ color: '#e6e600' }} />
                    {/* </Grid> */}
                    {/* <Grid xs={10}> */}
                        Alerta
                    {/* </Grid> */}
                {/* </Grid> */}
            </DialogTitle>
            <DialogContent>El cálculo del indicador no aplica para el nivel de manzana censal</DialogContent>
            <DialogActions>
                <Button onClick={cerrarDialogo}>Aceptar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Dialogo;