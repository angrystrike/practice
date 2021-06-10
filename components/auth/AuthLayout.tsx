import * as React from 'react';


export interface ILayoutProps {
    children: React.ReactNode;
}

export interface ILayoutState {
}

export default class AuthLayout extends React.Component<ILayoutProps, ILayoutState> {
    constructor(props: ILayoutProps) {
        super(props);

        this.state = {
        }
    }

    public render() {
        const { children } = this.props;
        return (
            <div className="overflow-y-hidden flex flex-col lg:flex-row">
                <div className="flex flex-col justify-center lg:justify-start bg-login lg:w-5/12 lg:h-screen px-20">
                    <div className="my-10 lg:mt-40">
                        <img className="mx-auto" width="100" height="70" src="/images/logo-login.png" />
                    </div>
                    <div className="mx-16 text-center">
                        <h2 className="text-darkYellow text-2xl font-semibold">Discover best offers here</h2>
                    </div>

                    <div className="sm:mt-10 lg:-mt-20 bg-login-svg bg-no-repeat min-h-19 bg-contain lg:min-h-full lg:bg-auto bg-center"></div>
                </div>

                <div className="flex lg:w-7/12">
                    <div className="lg:flex lg:flex-col lg:w-full lg:max-w-6xl items-center lg:justify-center mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
