import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Link,
  Stack,
  Typography,
} from '@mui/joy';
import moment from 'moment';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Products = () => {
  const currentDate = moment().format('LL');
  console.log(currentDate);
  return (
    <>
      <Stack>
        <Typography level='h1' fontWeight={'400'} mb={2}>
          {currentDate}
        </Typography>
      </Stack>
      <Stack>
        <Typography level='h2' fontWeight={'400'}>
          Group
        </Typography>
        <Stack>
          <Card sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg' }}>
            <CardOverflow>
              <AspectRatio sx={{ minWidth: 200 }}>
                <img
                  src='https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286'
                  srcSet='https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x'
                  loading='lazy'
                  alt=''
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level='body-xs'>Bluetooth Headset</Typography>
              <Link
                href='#product-card'
                fontWeight='md'
                color='neutral'
                textColor='text.primary'
                overlay
                endDecorator={<ArrowOutwardIcon />}
              >
                Super Rockez A400
              </Link>

              <Typography
                level='title-lg'
                sx={{ mt: 1, fontWeight: 'xl' }}
                endDecorator={
                  <Chip
                    component='span'
                    size='sm'
                    variant='soft'
                    color='success'
                  >
                    Lowest price
                  </Chip>
                }
              >
                2,900 THB
              </Typography>
              <Typography level='body-sm'>
                (Only <b>7</b> left in stock!)
              </Typography>
            </CardContent>
            <CardOverflow>
              <Button variant='solid' color='danger' size='lg'>
                Add to cart
              </Button>
            </CardOverflow>
          </Card>
        </Stack>
      </Stack>
    </>
  );
};

export default Products;
