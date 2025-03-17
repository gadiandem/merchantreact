import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

const RefundsTable = ({ refunds }: any) => (
    <Table>
        <THead>
            <Tr>
                <Th>ID</Th>
                <Th>Amount</Th>
                <Th>Remark</Th>
                <Th>Refund Txn</Th>
                <Th>ARN</Th>
                <Th>Status</Th>
            </Tr>
        </THead>
        <TBody>
            {refunds.map((item: any, index: number) =>
                <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{item.refundAmount}</Td>
                    <Td>{item.remark}</Td>
                    <Td>{''}</Td>
                    <Td>{''}</Td>
                    <Td>{item.status}</Td>
                </Tr>
            )}
        </TBody>
    </Table>
)

export default RefundsTable