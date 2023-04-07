import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

import { getUsersHandler } from '@/modules/user/user.service';
import { IUser } from '@/modules/user/user.types';

const UsersPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ users }) => {
  return (
    <>
      <h2>Headers</h2>
      {users.map((user) => (
        <>
          <h3 key={user.id}>{user.name}</h3>
        </>
      ))}
    </>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const res = await getUsersHandler();

  if (res.data) {
    const users: IUser[] = res.data;
    return {
      props: {
        users,
      },
    };
  }

  return {
    notFound: true,
  };
};
export default UsersPage;
