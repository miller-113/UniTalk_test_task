import { Container, Typography } from "@mui/material"
import { styles } from "./Operators.style"
import OperatorTable from "~/components/operator-table/OperatorTable"

const Operators = () => {
  return (
    <Container fixed sx={styles.container}>
      <Typography variant="h4">Оператори</Typography>
      <OperatorTable/>
    </Container>
  )
}
export default Operators