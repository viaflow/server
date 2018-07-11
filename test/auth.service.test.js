import { verifyToken, serializeToken } from '../src/services/auth.service';
import init from '../src/init';

beforeAll(() => {
    console.log(process.env.PORT);
    console.log('---------------');
    init.forEach((i) => {
        i();
    });
});

test('Auth Service verifyToken', async () => {
    const data = await verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiMTIzNDU2Nzg5MCIsIm5hbWUiOiJKb2huIERvZSJ9.ra_dtIqu1sZn_Y1hVgG88eXFIPCy7FgNXm8-V-EWehE', 'cronflow');
    // console.log(data);
    expect(data.result).toBe(true);
});


// describe('Auth Service verifyToken', () => {
//     it('should return an object with correct token', async () => {

//     });

//     it('should throw error on in');
// });
