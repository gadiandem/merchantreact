import Table from '@/components/ui/Table'

const { Tr, Th, Td, THead, TBody } = Table

const NotificationsTable = ({ notifications }: any) => (
    <Table>
        <THead>
            <Tr>
                <Th>Order Status</Th>
                <Th>Order Message</Th>
                <Th>Send Date</Th>
                <Th>Notification Status</Th>
                <Th>Notification Message</Th>
                <Th>Retry</Th>
            </Tr>
        </THead>
        <TBody>
            {notifications.map((item: any, index: number) =>
                <Tr key={index}>
                    <Td>{item.status_order}</Td>
                    <Td>{item.status_order_msg}</Td>
                    <Td>{item.senddate}</Td>
                    <Td>{item.status + ` - STATIC VALUE`}</Td>
                    <Td>{item.errorMsg}</Td>
                    <Td>{item.retry}</Td>
                </Tr>
            )}
        </TBody>
    </Table>
)

export default NotificationsTable