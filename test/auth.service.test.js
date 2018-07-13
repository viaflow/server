import { verifyToken } from '../src/services/auth.service';

test('verifyToken simple test', async () => {
    // const rst = await verifyToken(
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTMxMzg0MDAxMDg0fQ._7Yau427wK6J48xPIpk55LfQQG5QoZZrf3PDHGh1pzY', 'cronflow',
    // );
    const rst = await verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BYXSDihgXZCPScr17djNdycMchBeDBFfpJWpkTNTST8', 'cronflow');
    console.log(rst);
    expect(rst.result).toBe(false);
});
