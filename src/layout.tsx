import { Layout, Menu, MenuProps } from 'antd';

const { Header, Content } = Layout;

export default function PageLayout() {
  const items: MenuProps['items'] = [];
  return (
    <Layout className=" h-[100vh] w-[100vw]">
      <Header className=" fixed z-50 h-16 w-[100vw]">
        <div className=" text-white">rrfe-pro</div>
        <Menu theme="dark" mode="horizontal" items={items} />
      </Header>
      <Content className=" mt-16 overflow-scroll px-5 py-5"></Content>
    </Layout>
  );
}
