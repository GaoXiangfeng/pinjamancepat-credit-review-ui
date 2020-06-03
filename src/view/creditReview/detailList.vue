<template>
  <div id="target">
    <div class="detailVal">
      <!-- 贷款次数、逾期天数、是否放款失败 、渠道-->
      <div class="loan-time">
        <span class="total">
          {{repeatOrderInfo.repeatOrder}}
          <p>{{data.promptText.text1}}</p>
        </span>
        <span class="day">
          {{repeatOrderInfo.overdueDays}}
          <p>{{data.promptText.text2}}</p>
        </span>
        <span class="loan">
          {{repeatOrderInfo.payFailOrder==1?'YES':'NO'}}
          <p>{{data.promptText.text3}}</p>
        </span>
        <span class="total">{{repeatOrderInfo.channel}}</span>
      </div>
      <!-- 终审人员在审核的时候展示 -->
      <div v-if="type==2 && !isCheck" class="moneyData">{{moneyData}}</div>
      <!-- 只有审核的时候展示 -->
      <div class="ticket-warning" v-if="!isCheck">
        <p>
          <span>
            current auditor:
            <strong class="green-color">{{currentAuditor}}</strong>
          </span>
          <span>
            total tickets:
            <strong
              :class="{'red-color': totalCount>10,'green-color':totalCount<=10}"
            >{{totalCount}}</strong>
          </span>
        </p>
      </div>
      <div class="risk-position">
        <div class="hit-rules">
          <Collapse>
            <Panel name="1">
              {{data.hitRiskText.hitRisk}}
              <!--前期只做强校验 审核人员能看到none 或者是复贷人员命中高风险 -->
              <span v-if="!isHaveHighRisk" class="none">none</span>
              <!--管理员可以看到命中hign_risk的订单和审核人员看到的两种情况的单子-->
              <span class="disk" v-if="isHaveHighRisk">high_risk</span>
              <span class="danger">{{data.hitRiskText.beforeReview}}</span>
              <!--如果用户身份证已经使用过就会有提示-->
              <span class="disk" v-if="isUsed">
                <strong>{{data.hitRiskText.isBind}}</strong>
              </span>
              <div slot="content" class="rules-content">
                <div>
                  <h3>高风险(high_risk)</h3>
                  <p v-for="item in highRiskArr" v-if="item.key" :key="item.value">{{item.text}}</p>
                  <p v-if="!isHaveHighRisk">none</p>
                </div>
                <div>
                  <h3>低风险(low_risk)</h3>
                  <p v-for="item in lowRiskArr" v-if="item.key" :key="item.value">{{item.text}}</p>
                  <p v-if="!isHaveLowRisk">none</p>
                </div>
                <div>
                  <h3>第三方(third_party)</h3>
                  <div v-if="isHaveThirdRisk && advanceUser[0].value">
                    <h4>
                      <br />用户(user)
                    </h4>
                    <p v-for="item in advanceUser" :key="item.key">{{item.key}}: {{item.value}}</p>
                  </div>

                  <div v-for="(items,index) in advanceCompanys" :key="index">
                    <h4>公司{{index + 1}}(company {{index + 1}})</h4>
                    <p v-for="(item,index) in items" :key="index">{{item.key}}: {{item.value}}</p>
                  </div>
                  <p v-if="!isHaveThirdRisk">none</p>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
      <!-- <div size="small" class="back-top-bt" type="primary" @click="goTop">{{data.userTitle.goTop}}</div> -->
      <div size="small" class="back-top-bt" type="primary" @click="goTop">
        <Icon type="arrow-up-a" size="18"></Icon>
      </div>
      <Button
        v-if="isCheck"
        @click="goBack"
        size="small"
        class="back-bt"
        type="primary"
      >{{data.userTitle.goBack}}</Button>
      <Tabs type="card" @on-click="clickTab" :value="value">
        <TabPane
          class="tabpane"
          :label="parentIndex!=4?parentItem.label:label5"
          v-show="parentItem.tab"
          v-for="(parentItem,parentIndex) in data.detailCardData"
          :key="parentIndex"
          :name="`${parentIndex}`"
        >
          <!--订单信息-->
          <div v-if="parentIndex === 0">
            <pinjaTable :title="data.orderTitle.orderInfo" :tableInfor="data.userOrderInfo"></pinjaTable>
            <pinjaTable
              :title="data.orderTitle.bankInfo"
              :tableInfor="data.userBankInfo"
              :isSuccess="isSuccess"
            ></pinjaTable>
            <!--银行账户姓名与申请人姓名校验 -->
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.bankInfoMatch.title}}</p>
              <div class="user-info">
                <Row>
                  <Col :span="12" class="user-col">
                    <span class="info-label">{{data.bankInfoMatch.holderName}}:</span>
                    <span class="info-value">
                      <Strong style="word-break: break-all;">{{bankCheckDataSource.bankHolderName}}</Strong>
                    </span>
                  </Col>
                  <Col :span="12" class="user-col">
                    <span class="info-label">{{data.bankInfoMatch.applyName}}:</span>
                    <span class="info-value">
                      <Strong style="word-break: break-all;">{{bankCheckDataSource.userName}}</Strong>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col :span="24" class="user-col">
                    <span class="info-label address">{{data.bankInfoMatch.matchScore}}:</span>
                    <span class="info-value">
                      <Strong
                        v-if="Number(bankCheckDataSource.macthScore) < 0.65 "
                        style="font-size:22px;color:red;word-break: break-all;"
                      >{{Number(bankCheckDataSource.macthScore).toFixed(2)}}</Strong>
                      <Strong
                        v-if="Number(bankCheckDataSource.macthScore) >= 0.65 "
                        style="font-size:22px;color:green;word-break: break-all;"
                      >{{Number(bankCheckDataSource.macthScore).toFixed(2)}}</Strong>
                    </span>
                  </Col>
                </Row>
              </div>
            </Card>
            <pinjaTable
              :title="data.orderTitle.repayBankInfo"
              :tableInfor="repayAccountInfo"
              :isHaveData="isHavePayHistory"
              :noDataText="data.nonePay"
            ></pinjaTable>
          </div>
          <!--用户信息-->
          <div v-if="parentIndex === 1" style="margin-top:50px;">
            <!--用户信息-->
            <pinjaTable
              :title="data.orderTitle.userInfo"
              :tableInfor="data.userInfo"
              :isSingle="singleArr"
            >
              <div slot="otherInfo">
                <Row>
                  <Col
                    :span="12"
                    v-for="(item,index) in data.contactText"
                    :key="index"
                    class="user-col"
                  >
                    <span class="info-label" v-if="item.label">{{item.label}}:</span>
                    <span class="info-value" v-if="item.label">
                      <Strong>{{item.value}}</Strong>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col :span="12">
                    <span style="display:inline-block;width: 36%;text-align:right;">
                      <span :class="{ callSelected : emergencyContact.firstNum == 1}">
                        <Button
                          @click="handleCallRecordForEmer(1,1)"
                          type="primary"
                          :disabled="!emergencyContact.firstStatus"
                        >{{data.userTitle.yes}}</Button>
                      </span>
                    </span>
                    <span :class="{ callSelected : emergencyContact.firstNum == 2}">
                      <Button
                        @click="handleCallRecordForEmer(1,2)"
                        type="error"
                        :disabled="!emergencyContact.firstStatus"
                      >{{data.userTitle.no}}</Button>
                    </span>
                    <!--借款信息-->
                    <!-- <span
                      v-if="emergencyContact.isOurUserFirst == 1 && emergencyContact.relationFirst != 99 && emergencyContact.hasLoanFirst == 1"
                    >
                      <Button
                        @click="handleToLoanInfo(emergencyContact.phoneNoFirst)"
                        type="primary"
                      >{{data.userTitle.loanInfo}}</Button>
                    </span>-->
                  </Col>
                  <Col :span="12">
                    <span style="display:inline-block;width: 36%;text-align:right">
                      <span :class="{ callSelected : emergencyContact.secondNum == 1}">
                        <Button
                          @click="handleCallRecordForEmer(2,1)"
                          type="primary"
                          :disabled="!emergencyContact.secondStatus"
                        >{{data.userTitle.yes}}</Button>
                      </span>
                    </span>
                    <span :class="{ callSelected : emergencyContact.secondNum == 2}">
                      <Button
                        @click="handleCallRecordForEmer(2,2)"
                        type="error"
                        :disabled="!emergencyContact.secondStatus"
                      >{{data.userTitle.no}}</Button>
                    </span>
                    <!--借款信息-->
                    <!-- <span
                      v-if="emergencyContact.isOurUserSec == 1 && emergencyContact.relationSec != 99  && emergencyContact.hasLoanSec == 1"
                    >
                      <Button
                        @click="handleToLoanInfo(emergencyContact.phoneNoSec)"
                        type="primary"
                      >{{data.userTitle.loanInfo}}</Button>
                    </span>-->
                  </Col>
                </Row>
              </div>
            </pinjaTable>
            <!--认证照片-->
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.userTitle.photo}}</p>
              <h4 class="phone-audit">{{data.userTitle.lastPhoto}}</h4>
              <Table
                :columns="userPhotoColumns1"
                :data="userPhotoData1"
                :no-data-text="data.tableNoText"
              ></Table>
              <h4 class="phone-audit">{{data.userTitle.recentPhoto}}</h4>
              <Table
                :columns="userPhotoColumns2"
                :data="userPhotoData2"
                :no-data-text="data.tableNoText"
              ></Table>
            </Card>
            <!--紧急联系人-->
            <Card class="detail-card">
              <p slot="title" class="title-label">{{data.userTitle.emergencyPerson}}</p>
              <Table
                style="margin-top:3px"
                :columns="EmergencyContactsColumns"
                :data="EmergencyContactsInfo"
                :no-data-text="data.tableNoText"
              ></Table>
            </Card>
            <!--本地通讯录-->
            <Card class="detail-card" v-if="baseChannelShow">
              <div
                slot="title"
                class="title-label"
                style=" display: flex;  flex-direction: row;  justify-content: space-between;  align-items: center;"
              >
                <div>{{data.userTitle.callBook}}</div>
                <div style="text-align:right;margin:15px 10px 5px 40px;font-size:14px">
                  <span>{{data.userTitle.platformUser}}:</span>
                  <span style="margin-right:15px">{{ourUserCount}}</span>

                  <span>{{data.userTitle.validNumCount}}:</span>
                  <span style="margin-right:15px">{{validNumCount}}</span>

                  <span>{{data.userTitle.invalidNumcount}}:</span>
                  <span>{{invalidNumcount}}</span>
                </div>
              </div>
              <div class="sort">
                <!-- <Button
                  type="primary"
                  @click="userNameSortByPhone"
                  :disabled="UserNamePhoneInfo.length==0"
                >
                  {{data.userTitle.phone}}
                  <Icon type="arrow-up-c" size="16" v-if="userNameSort.phone"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!userNameSort.phone"></Icon>
                </Button>
                <Button
                  type="primary"
                  @click="userNameSortByCount"
                  :disabled="UserNamePhoneInfo.length==0"
                >
                  {{data.userTitle.count}}
                  <Icon type="arrow-up-c" size="16" v-if="userNameSort.count"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!userNameSort.count"></Icon>
                </Button>-->
              </div>
              <Table
                @on-sort-change="sortChangeLocalCallBook"
                :columns="UserNameColumns"
                :data="UserNamePhoneInfo"
                :no-data-text="data.tableNoText"
              ></Table>
              <div style="text-align:right;margin:20px 10px 40px 40px">
                <Page
                  :total="userNameForm.totalItems"
                  :current="userNameForm.page"
                  :page-size="userNameForm.pageSize"
                  @on-page-size-change="changeSize1"
                  @on-change="changePage1"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                ></Page>
              </div>
            </Card>
            <!--本地短信-->
            <Card class="detail-card" v-if="baseChannelShow">
              <p slot="title" class="title-label">{{data.userTitle.message}}</p>
              <div class="sort">
                <Button
                  type="primary"
                  @click="messageSortByTimeFn"
                  :disabled="UserNativeMessageInfo.length==0"
                >
                  {{data.userTitle.sendOrAcceptTime}}
                  <Icon type="arrow-up-c" size="16" v-if="messageSort.sendOrAcceptTime"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!messageSort.sendOrAcceptTime"></Icon>
                </Button>
                <Button
                  type="primary"
                  @click="messageSortByRiskFn"
                  :disabled="UserNativeMessageInfo.length==0"
                >{{data.userTitle.riskMessage}}</Button>
                <Button
                  class="translate"
                  @click="translateFn(UserNativeMessageInfo)"
                  type="primary"
                  v-if="language=='cn'"
                >translate</Button>
              </div>
              <Table
                :columns="UserMessageColumns"
                :data="UserNativeMessageInfo"
                :no-data-text="data.tableNoText"
              ></Table>
              <div style="text-align:right;margin:20px 10px 40px 40px">
                <Page
                  :total="userMessageForm.totalItems"
                  :current="userMessageForm.page"
                  :page-size="userMessageForm.pageSize"
                  @on-page-size-change="changeSize2"
                  @on-change="changePage2"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                ></Page>
              </div>
            </Card>
            <!--通话记录-->
            <Card class="detail-card" v-if="baseChannelShow">
              <p slot="title" class="title-label">{{data.userTitle.callRecord}}</p>
              <div class="sort">
                <Button
                  type="primary"
                  @click="callRecordByTime"
                  :disabled="UserCallRecordInfo.length==0"
                >
                  {{data.userTitle.callTime}}
                  <Icon type="arrow-up-c" size="16" v-if="callRecordSort.callTime"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!callRecordSort.callTime"></Icon>
                </Button>
                <Button
                  type="primary"
                  @click="callRecordByDuration"
                  :disabled="UserCallRecordInfo.length==0"
                >
                  {{data.userTitle.callDuration}}
                  <Icon type="arrow-up-c" size="16" v-if="callRecordSort.duration"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!callRecordSort.duration"></Icon>
                </Button>
              </div>
              <Table
                :columns="UserCallRecordColumns"
                :data="UserCallRecordInfo"
                :no-data-text="data.tableNoText"
              ></Table>
              <div style="text-align:right;margin:20px 10px 220px 40px;">
                <Page
                  :total="callRecordsForm.totalItems"
                  :current="callRecordsForm.page"
                  :page-size="callRecordsForm.pageSize"
                  @on-page-size-change="changeSize3"
                  @on-change="changePage3"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                ></Page>
              </div>
            </Card>
          </div>
          <!--审核信息-->
          <div v-if="parentIndex === 2">
            <Card class="detail-card">
              <p slot="title" class="title-label">{{parentItem.label}}</p>
              <Table
                :columns="auditColumns"
                :data="auditInformation"
                :no-data-text="data.tableNoText"
              ></Table>
            </Card>
          </div>
          <!--历史借贷-->
          <div v-if="parentIndex === 3">
            <Card class="detail-card">
              <p slot="title" class="title-label">{{parentItem.label}}</p>
              <div class="sort">
                <Button
                  type="primary"
                  @click="historyLoanByTime"
                  :disabled="historyLoanInfo.length==0"
                >
                  {{data.userTitle.createTime}}
                  <Icon type="arrow-up-c" size="16" v-if="historyLoanSort.createTime"></Icon>
                  <Icon size="16" type="arrow-down-c" v-if="!historyLoanSort.createTime"></Icon>
                </Button>
              </div>
              <Table
                :columns="historyLoanColumns"
                :data="historyLoanInfo"
                :no-data-text="data.tableNoText"
              ></Table>
              <div style="text-align:right;margin:20px 10px 0 40px;">
                <Page
                  :total="historyLoanForm.totalItems"
                  :current="historyLoanForm.page"
                  placement="top"
                  :page-size="historyLoanForm.pageSize"
                  @on-page-size-change="changeSize4"
                  @on-change="changePage4"
                  size="small"
                  show-total
                  show-elevator
                  show-sizer
                ></Page>
              </div>
            </Card>
          </div>
          <!--数据爬取-->
          <div v-if="parentIndex === 4" class="data-crawl">
            <Tabs :value="secondValue" @on-click="changeSecondTab">
              <TabPane class="tabpanechild" :label="data.crawDataTabTitle.advance" name="second1">
                <!--人脸识别-->
                <Card class="detail-card" style="margin-top:25px">
                  <p slot="title" class="title-label">{{data.faceIdentification.title}}</p>
                  <div style="margin-top:20px;">
                    <div>
                      <span>{{data.faceIdentification.similarity}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span>{{faceIdentificationData.similarity}}</span>
                    </div>
                    <div style="margin-top:20px;">
                      <!-- <span>{{data.faceIdentification.compareCount}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span>{{faceIdentificationData.comparisonCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>-->
                      <span
                        v-if="faceIdentificationData.comparisonCount >= 10"
                        style="color:red"
                      >{{data.faceIdentification.countTip}}</span>
                    </div>
                    <div style="margin-top:20px;">
                      <span>{{data.faceIdentification.reviewSuggestion}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span v-if="faceIdentificationData.advise == 0">{{ data.tabResult.pass }}</span>
                      <span v-if="faceIdentificationData.advise == 1">{{ data.tabResult.reject }}</span>
                      <span
                        v-if="faceIdentificationData.advise == 2"
                      >{{data.tabResult.waitPersonReview }}</span>
                    </div>
                  </div>
                </Card>
              </TabPane>

              <!-- <TabPane class="tabpanechild" :label="label2" name="second2">
                                <div class="crawl-commerce">
                                    <Tabs style="margin-top:5px" size="small" @on-click="changeThirdTab" :value="thirdValue">
                                        
                                        <TabPane class="tabpanechild"  :label="items.label"  :name="items.label" v-for="(items,indexs) in eCommerceInfo.tabs" :key="items.label">
                                            <div v-if="eCommerceInfo.data && eCommerceInfo.data.length>0 && indexs==a" v-for="(info,a) in eCommerceInfo.data" :key="'label'+a" >
                                                <Collapse v-model="collapseValue1">
                                                    <Panel name="1">
                                                        <div slot="content">
                                                           
                                                            <div v-if="eCommerceInfo.data[indexs] && eCommerceInfo.data[indexs].cardArr.length>0">
                                                                <Card class="detail-card" v-for="(itemArr,indexArr) in eCommerceInfo.data[indexs].cardArr" :key="`all${indexArr}`">
                                                                    <p slot="title" class="title-label">{{itemArr.title}} <Button type="primary" style="margin-left:10px;" v-if="indexArr!=0" :disabled="itemArr.data.length == 0" @click="translateProduct(indexs,indexArr)">translate</Button></p> 
                                                                    <Table :columns="itemArr.coloumn" border :data="itemArr.data" :height="itemArr.data.length>0?300:0" :no-data-text="data.tableNoText"></Table>
                                                                </Card>
                                                            </div>    
                                                        </div>
                                                    </Panel>
                                                    <Panel name="2">
                                                        <div slot="content">
                                                           
                                                            <div v-if="eCommerceInfo.data[indexs]">
                                                                <Card class="detail-card" v-for="(item,index) in eCommerceInfo.data[indexs].cardObjArr" :key="index">
                                                                    <p slot="title" class="title-label">{{item.title}}</p>
                                                                    <pinjaTable  :tableInfor="item.content"></pinjaTable>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </Panel>
                                                    <Panel name="3">
                                                        <p slot="content">
                                                             
                                                            <pinjaTable v-if="eCommerceInfo.data[indexs] && eCommerceInfo.data[indexs].outInfo.length>0" :tableInfor="eCommerceInfo.data[indexs].outInfo"></pinjaTable>
                                                        </p>
                                                    </Panel>
                                                </Collapse>      
                                            </div>
                                        </TabPane>        
                                    </Tabs>
                                </div>
                            </TabPane>
                            <TabPane class="tabpanechild" :label="label3" name="second3">
                                <div class="crawl-commerce">
                                    <Tabs size="small" @on-click="changeThirdTab" :value="thirdValue">
                                        <TabPane class="m-t-90"  :label="items.label"  :name="items.label" v-for="(items,indexs) in ridesInfo.tabs" :key="items.label">
                                            <div v-if="ridesInfo.data && ridesInfo.data.length>0 && indexs==a" v-for="(info,a) in ridesInfo.data" :key="'label'+a" >
                                                <Collapse v-model="collapseValue1">
                                                    <Panel name="1">
                                                        <div slot="content">
                    
                                                            <div v-if="ridesInfo.data[indexs] && ridesInfo.data[indexs].cardArr.length>0">
                                                                <Card class="detail-card" v-for="(itemArr,indexArr) in ridesInfo.data[indexs].cardArr" :key="`all${indexArr}`">
                                                                    <p slot="title" class="title-label">{{itemArr.title}}</p>
                                                                    <Table :columns="itemArr.coloumn" border :data="itemArr.data" :height="itemArr.data.length>0?300:0" :no-data-text="data.tableNoText"></Table>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </Panel>
                                                    <Panel name="2">
                                                        <div slot="content">
                                               
                                                            <div v-if="ridesInfo.data[indexs]">
                                                                <Card class="detail-card" v-for="(item,index) in ridesInfo.data[indexs].cardObjArr" :key="index">
                                                                    <p slot="title" class="title-label">{{item.title}}</p>
                                                                    <pinjaTable  :tableInfor="item.content"></pinjaTable>
                                                                </Card>
                                                            </div>
                                                        </div>
                                                    </Panel>
                                                    <Panel name="3">
                                                        <p slot="content">
                  
                                                             <pinjaTable v-if="ridesInfo.data[indexs] && ridesInfo.data[indexs].outInfo.length>0" :tableInfor="ridesInfo.data[indexs].outInfo"></pinjaTable>
                                                        </p>
                                                    </Panel>
                                                </Collapse>   
                                            </div>  
                                        </TabPane>        
                                    </Tabs>
                                </div>
                            </TabPane>
              <TabPane class="tabpanechild" :label="label4" name="second4">标签四的内容</TabPane>-->
            </Tabs>
          </div>
        </TabPane>
      </Tabs>
    </div>
    <!--审核操作-审核人员可以看到、管理员只能查看-->
    <Row v-if="!isCheck">
      <Col :span="23" class="auditAgree" :class="{isShowColor: !isShow}">
        <div class="detail-card">
          <div class="user-input-search" :class="{isOpacity: !isShow}" v-show="isShow">
            <span class="user-input-label">{{data.userTitle.action}}:</span>
            <Select v-model="data.auditForm.status" class="user-input">
              <Option
                :value="item.key"
                v-for="(item) in data.actionText"
                :key="item.key"
              >{{item.value}}</Option>
            </Select>
            <span
              class="user-input-label"
              v-if="data.auditForm.status == '2'"
            >{{data.userTitle.rejectReason}}:</span>
            <Select
              v-model="data.auditForm.rejectReason"
              placement="top"
              v-if="data.auditForm.status == '2'"
              class="user-input"
            >
              <Option :value="item" v-for="(item,index) in data.rejectReason" :key="index">{{item}}</Option>
            </Select>
            <br />
            <span class="user-input-label">{{data.userTitle.remark}}:</span>
            <Input
              v-model="data.auditForm.remark"
              class="mark"
              type="textarea"
              :autosize="{minRows: 3,maxRows: 5}"
            ></Input>
            <Button
              type="primary"
              size="large"
              class="submit-bt"
              @click="submit()"
            >{{data.userTitle.submit}}</Button>
          </div>
        </div>
      </Col>
      <Col :span="1" style="float:right">
        <div class="show" @click="isShow=!isShow">
          <Icon v-show="isShow" type="chevron-right" size="18" style="color:#fff"></Icon>
          <Icon v-show="!isShow" type="chevron-left" size="18" style="color:#fff"></Icon>
        </div>
      </Col>
    </Row>
    <!-- 用户相片认证弹窗-->
    <Modal v-model="modal1" width="1000">
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span>{{data.userPhotoTitle[showIndex]}}</span>
      </p>
      <div style="text-align:center;" v-if="last">
        <img
          v-if="showIndex == 0"
          :src="userPhotoData1[0] && userPhotoData1[0].idCardImage"
          class="modal-photo"
        />
        <img v-if="showIndex == 1" :src="userPhotoData1[0].handIdCardImage" class="modal-photo" />
        <img v-if="showIndex == 2" :src="userPhotoData1[0].liveness" class="modal-photo" />
        <img v-if="showIndex == 3" :src="userPhotoData1[0].salaryImage" class="modal-photo" />
        <img v-if="showIndex == 4" :src="userPhotoData1[0].bankImage" class="modal-photo" />
        <img v-if="showIndex == 5" :src="userPhotoData1[0].workImage" class="modal-photo" />
      </div>
      <div style="text-align:center;" v-else>
        <img v-if="showIndex == 0" :src="userPhotoData2[0].idCardImage" class="modal-photo" />
        <img v-if="showIndex == 1" :src="userPhotoData2[0].handIdCardImage" class="modal-photo" />
        <img v-if="showIndex == 2" :src="userPhotoData2[0].liveness" class="modal-photo" />
        <img v-if="showIndex == 3" :src="userPhotoData2[0].salaryImage" class="modal-photo" />
        <img v-if="showIndex == 4" :src="userPhotoData2[0].bankImage" class="modal-photo" />
        <img v-if="showIndex == 5" :src="userPhotoData2[0].workImage" class="modal-photo" />
      </div>
      <div slot="footer">
        <Button type="primary" @click="confirm1">{{data.userTitle.confirm}}</Button>
      </div>
    </Modal>
    <!-- 确认审核弹窗 -->
    <Modal v-model="modal2" width="500">
      <h3 style="text-align: center">{{data.userTitle.title}}</h3>
      <div slot="footer">
        <Button type="primary" @click="confirm2" :loading="loading">
          <span v-if="!loading">{{data.userTitle.confirm}}</span>
          <span v-else>{{data.userTitle.loading}}...</span>
        </Button>
        <Button type="primary" @click="cancel">{{data.userTitle.cancel}}</Button>
      </div>
    </Modal>
    <!-- 历史借贷查看弹窗 -->
    <Modal v-model="modal3" width="900">
      <expandRow :infors="auditRows" style="margin-top:20px"></expandRow>
      <div slot="footer">
        <Button type="primary" @click="modal3=!modal3">{{data.userTitle.confirm}}</Button>
      </div>
    </Modal>
    <!-- 用户领取工单数超过10的提醒弹窗 -->
    <Modal v-model="modal4" width="450">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Information</span>
      </p>
      <h3 style="text-align:center">You have received more than 10 tickets, please release~</h3>
      <div slot="footer">
        <Button type="warning" @click="modal4=!modal4">ok</Button>
      </div>
    </Modal>
    <!-- 用户领取工单数超过10的提醒弹窗 -->
    <Modal v-model="modal5" width="450" :closable="false" :mask-closable="false">
      <p slot="header" style="color:#2ed272;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>Information</span>
      </p>
      <h2 style="text-align:center">Audit successfully ! please audit next~~</h2>
      <div slot="footer">
        <Button type="success" @click="auditNext">ok</Button>
      </div>
    </Modal>
    <a ref="targetdetail" href target="_blank"></a>
  </div>
</template>
<script>
import store from "../../store/index";
import { mapState } from "vuex";
import detailListApi from "../../services/api/detailList.service";
import taskPanelApi from "../../services/api/taskPanel.service";
import localStorage from "../../services/localStorage.service";
import moment from "moment";
import noImgSrc from "../../assets/default.png";
import pinjaTable from "../../components/pinja-table.vue";
import expandRow from "../../components/table-expand.vue";
import pinjaTwoTable from "../../components/pinja-two-table.vue";
export default {
  data() {
    return {
      bankCheckDataSource: {
        userName: "",
        bankHolderName: "",
        macthScore: ""
      },
      isCallRecordVisi: true, //用于判断按钮是否可点状态
      channelId: 0, //渠道号
      baseChannelShow: true, //根据渠道号是否显示短信列表等
      isShow: false,
      value1: [1],
      value2: [],
      value3: [],
      collapseValue1: "1",
      secondValue: "second2",
      thirdValue: "third1",
      singleArr: [0, 7, 12, 13, 14],
      LaDeliverySingle: [2, 3],
      LaBillsSingle: [2, 3],
      LaOtherSingle: [2, 3],
      loading: false,
      value: "0",
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      modal5: false,
      auditRows: [],
      showIndex: 0,
      last: true,
      data: {
        hitRiskText: {},
        detailCardData: [],
        orderTitle: {},
        bankInfoMatch: {},
        promptText: {},
        userOrderInfo: [],
        userBankInfo: [],
        userPayInfo: [],
        loanTypeText: {},
        loanDay: "",
        rate: "",
        rateTypeText: {},
        nameValid: {},
        nonePay: "",
        userTitle: {},
        userInfo: [],
        contactText: [],
        isOurUser: {},
        contactTime: {},
        tableNoText: "无数据",
        userPhotoTitle: {},
        userCallBookTitle: {},
        userMessageTitle: {},
        userCallRecordTitle: {},
        occupationText: {},
        educationText: {},
        relationText: {},
        genderText: {},
        purposeText: {},
        //审核信息
        auditInfoTitle: {},
        auditLevelText: {}, //阶段
        auditActionText: {}, //审核结果
        //数据抓取
        crawDataTabTitle: {},
        crawlingBaseDataLa: [], //基本信息
        crawlingAddrDeliveryDataLa: [], //配送信息
        crawlingAddrBillsDataLa: [], //账单地址
        crawlingAddrOtherDataLa: [], //其他地址
        //审核 拒绝原因和提交表单
        actionText: [],
        rejectReason: [],
        auditForm: {},
        //历史借贷
        historyLoanTitle: {},
        tabResult: {},
        faceIdentification: {}
      },
      isHaveHighRisk: false,
      isHaveLowRisk: false,
      isHaveThirdRisk: false,
      highRiskArr: [
        {
          key: false,
          value: "ageRule", //18<age<50。
          text: "身份证年龄不在范围内(Age out of range)"
        },
        {
          key: false,
          value: "messageRule", //短信记录<20
          text: "短信记录(Num of SMS on device)"
        },
        {
          key: false,
          value: "callbookRule", //手机联系人（去重）<50个。
          text: "手机号关联的联系人数量(Num of contacts for mobile)"
        },
        {
          key: false,
          value: "callRecordRule", //通话记录<50
          text: "通话记录数量(Num of call log on device)"
        },
        {
          key: false,
          value: "callBookTimesRule", //最近50次通话记录中>45不在手机人联系名单里
          text:
            "所有通话中陌生号码的数量(Unknown contacts within recent all  calls)"
        },
        {
          key: false,
          value: "callRecordTimesRule", //include =拒接的or关机的or未接的>=80%.(近50个)
          text: "最近50次通话中未接(Missed  within recent 50 calls)"
        },
        {
          key: false,
          value: "loanPurposeRule", //借款目的 还贷款
          text: "贷款目的"
        }
      ],
      lowRiskArr: [
        {
          key: false,
          value: "", //
          text: "身份证格式校验失败(invalid NLK format)"
        },
        {
          key: false,
          value: "", //
          text: "月薪<=2条(Monthly salary<=2juta)"
        },
        {
          key: false,
          value: "", //
          text: "还款日/发薪日存在高风险(High risk of repay date/pay date)"
        },
        {
          key: false,
          value: "", //
          text:
            "同一androidID关联的IMEI号数量>=2(Num of IMEIs refer to device>=2)"
        },
        {
          key: false,
          value: "", //
          text:
            "同一androidID关联的手机号数量>=2(Num of mobiles refer to device>=2)"
        },
        {
          key: false,
          value: "", //
          text:
            "同一身份证号关联的androidID数量>=2(Num of devices refer to NIK>=2)"
        },
        {
          key: false,
          value: "", //
          text: "同一身份证号关联的imei号数量>=2(Num of IMEIs refer to NIK>=2))"
        },
        {
          key: false,
          value: "", //
          text:
            "同一手机号关联的androidID数量>=2(Num of devices refer to mobile>=2)"
        },
        {
          key: false,
          value: "", //
          text: "同一手机号关联的IMEI数量>=2(Num of IMEIs refer to mobile>=2)"
        },
        {
          key: false,
          value: "", //
          text: "逾期短信数量>=1(Overdue SMS count>=1)"
        },
        {
          key: false,
          value: "", //
          text: "贷款短信数量>=4(loan SMS count >=4)"
        },
        {
          key: false,
          value: "", //
          text: "该笔订单的绑卡失败>=1(The order card failed to bind)"
        },
        {
          key: false,
          value: "", //
          text: "某个紧急联系人的通话次数<10(Any emergency contact times<10)"
        }
      ],
      advanceUser: [
        {
          key: "name",
          value: "" //
        },
        {
          key: "province",
          value: "" //
        },
        {
          key: "city",
          value: "" //
        },
        {
          key: "district",
          value: "" //
        },
        {
          key: "village",
          value: "" //
        }
      ],
      advanceCompanys: [],
      repayAccountInfo: [],
      repeatOrderInfo: {
        overdueDays: 0,
        payFailOrder: 0,
        repeatOrder: 0,
        channel: ""
      }, //用户标签
      isSuccess: 0, //是否绑卡成功 0 未校验  1 校验中 2 校验通过 3 校验不通过
      isHavePayHistory: false, //是否有还款账号
      searchType: [],
      userPhotoColumns1: [
        {
          title: "正面照片",
          key: "idCardImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.idCardImage) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 0;
                  this.last = true;
                }
              }
            });
          }
        },
        {
          title: "手持照片",
          key: "handIdCardImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.handIdCardImage) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 1;
                  this.last = true;
                }
              }
            });
          }
        },
        {
          title: "人脸照片",
          key: "liveness",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.liveness) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 2;
                  this.last = true;
                }
              }
            });
          }
        },
        {
          title: "工资照片",
          key: "salaryImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.salaryImage != undefined) {
              if (params.row.salaryImage.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.salaryImage;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.salaryImage) return;
                    this.modal1 = true;
                    this.showIndex = 3;
                    this.last = true;
                  } else {
                    this.$showPDF(params.row.salaryImage);
                  }
                }
              }
            });
          }
        },
        {
          title: "银行流水",
          key: "bankImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.bankImage != undefined) {
              if (params.row.bankImage.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.bankImage;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  if (!isPdf) {
                    if (!params.row.bankImage) return;
                    this.modal1 = true;
                    this.showIndex = 4;
                    this.last = true;
                  } else {
                    this.$showPDF(params.row.bankImage);
                  }
                }
              }
            });
          }
        },
        {
          title: "证件照片",
          key: "workImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.workImage) || noImgSrc
              },
              on: {
                click: () => {
                  if (!params.row.workImage) return;
                  this.modal1 = true;
                  this.showIndex = 5;
                  this.last = true;
                }
              }
            });
          }
        }
      ],
      userPhotoColumns2: [
        {
          title: "正面照片",
          key: "idCardImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.idCardImage) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 0;
                  this.last = false;
                }
              }
            });
          }
        },
        {
          title: "手持照片",
          key: "handIdCardImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.handIdCardImage) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 1;
                  this.last = false;
                }
              }
            });
          }
        },
        {
          title: "人脸照片",
          key: "liveness",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.liveness) || ""
              },
              on: {
                click: () => {
                  this.modal1 = true;
                  this.showIndex = 2;
                  this.last = false;
                }
              }
            });
          }
        },
        {
          title: "工资照片",
          key: "salaryImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.salaryImage != undefined) {
              if (params.row.salaryImage.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.salaryImage;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  //测试使用（勿删）
                  //this.$showPDF('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf')
                  if (!isPdf) {
                    if (!params.row.salaryImage) return;
                    this.modal1 = true;
                    this.showIndex = 3;
                    this.last = false;
                  } else {
                    this.$showPDF(params.row.salaryImage);
                  }
                }
              }
            });
          }
        },
        {
          title: "银行流水",
          key: "bankImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            // 分三种情况
            //1、有工资字段，包括图片或者pdf两种情况
            //2、没有工资字段  显示默认图片
            var src = "";
            var isPdf = false;
            if (params.row.bankImage != undefined) {
              if (params.row.bankImage.includes("pdf")) {
                src = pdfSrc;
                isPdf = true;
              } else {
                src = params.row.bankImage;
              }
            } else {
              src = noImgSrc;
            }
            return h("Img", {
              attrs: {
                src: src
              },
              on: {
                click: () => {
                  //测试使用（勿删）
                  // this.$showPDF('http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf')
                  if (!isPdf) {
                    if (!params.row.bankImage) return;
                    this.modal1 = true;
                    this.showIndex = 4;
                    this.last = false;
                  } else {
                    this.$showPDF(params.row.bankImage);
                  }
                }
              }
            });
          }
        },
        {
          title: "证件照片",
          key: "workImage",
          className: "demo-table-hover-column",
          render: (h, params) => {
            return h("Img", {
              attrs: {
                src: (params.row && params.row.workImage) || noImgSrc
              },
              on: {
                click: () => {
                  if (!params.row.workImage) return;
                  this.modal1 = true;
                  this.showIndex = 5;
                  this.last = false;
                }
              }
            });
          }
        }
      ],
      userPhotoData1: [],
      userPhotoData2: [],
      emergencyContact: {
        firstStatus: false,
        firstNum: 0,
        // isOurUserFirst: 0, //是否为我们平台用户
        // phoneNoFirst: "",
        // relationFirst: "99",
        // hasLoanFirst: 0,

        secondStatus: false,
        secondNum: 0
        // isOurUserSec: 0, //是否为我们平台用户
        // phoneNoSec: "",
        // relationSec: "99",
        // hasLoanSec: 0
      },
      //紧急联系人
      EmergencyContactsInfo: [],
      EmergencyContactsColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "性别",
          key: "gender",
          render: (h, params) => {
            return h("div", this.data.genderText[params.row.gender]);
          }
        },
        {
          title: "关系",
          key: "relation",
          render: (h, params) => {
            return h("div", this.data.relationText[params.row.relation]);
          }
        },
        {
          title: "手机号",
          key: "phoneNo"
        },
        {
          title: "",
          key: "",
          render: (h, params) => {
            let _disabled;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2;
            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = {
                marginRight: "5px"
              };
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    display: "none",
                    type: "primary",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn1,
                  on: {
                    click: () => {
                      this.handleCallRecordForEmerList(params.row.phoneNo, 1);
                    }
                  }
                },
                this.data.userTitle.yes
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn2,
                  on: {
                    click: () => {
                      this.handleCallRecordForEmerList(params.row.phoneNo, 2);
                    }
                  }
                },
                this.data.userTitle.no
              )
            ]);
          }
        }
      ],
      //通讯录
      UserNameColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "关系",
          key: "relation",
          sortable: "custom",
          render: (h, params) => {
            return h("div", this.data.relationText[params.row.relation]);
          }
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "联系次数",
          key: "count",
          sortable: "custom"
        },
        {
          title: "平台用户",
          key: "isOurUser",
          render: (h, params) => {
            return h("div", this.data.isOurUser[params.row.isOurUser]);
          }
        },
        {
          title: "",
          key: "",
          width: 300,
          render: (h, params) => {
            let _disabled, _isOurUser;
            if (this.isCallRecordVisi) {
              _disabled = params.row.ecStatus == 0 ? false : true;
            } else {
              _disabled = true;
            }
            let _styleForBtn1, _styleForBtn2;
            if (params.row.ecStatus == 1) {
              _styleForBtn1 = {
                marginRight: "5px",
                border: "3px solid #d242f6"
              };
            } else if (params.row.ecStatus == 2) {
              _styleForBtn1 = {
                marginRight: "5px"
              };
              _styleForBtn2 = {
                border: "3px solid #d242f6"
              };
            } else {
              _styleForBtn1 = {
                marginRight: "5px"
              };
            }
            if (params.row.isShowButton) {
              _isOurUser = "";
            } else {
              _isOurUser = "none";
            }

            return h("div", [
              h(
                "Button",
                {
                  props: {
                    display: "none",
                    type: "primary",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn1,
                  on: {
                    click: () => {
                      this.handleCallRecordForCallBook(params.row.phone, 1);
                    }
                  }
                },
                this.data.userTitle.yes
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "large",
                    disabled: _disabled
                  },
                  style: _styleForBtn2,
                  on: {
                    click: () => {
                      this.handleCallRecordForCallBook(params.row.phone, 2);
                    }
                  }
                },
                this.data.userTitle.no
              ),
              h(
                "Button", //借款信息
                {
                  props: {
                    type: "primary",
                    size: "large"
                  },
                  style: {
                    marginLeft: "5px",
                    display: _isOurUser
                  },
                  on: {
                    click: () => {
                      this.handleToLoanInfo(params.row.showButtonOrderId);
                    }
                  }
                },
                this.data.userTitle.loanInfo
              )
            ]);
          }
        }
      ],
      //平台用户数量
      ourUserCount: 0,
      validNumCount: 0,
      invalidNumcount: 0,

      UserNamePhoneInfo: [],
      userNameForm: {
        totalItems: 0,
        page: 1,
        pageSize: 10,
        sortStr: "DESC",
        sortBy: "count"
      },
      userNameSort: {
        phone: false,
        count: false
      },
      //短信
      userMessageForm: {
        totalItems: 0,
        page: 1,
        pageSize: 10,
        sortStr: "DESC",
        sortBy: "riskMessage"
      },
      UserMessageColumns: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "收发时间",
          key: "sendOrAcceptTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.sendOrAcceptTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "手机号",
          key: "phone",
          width: 150
        },
        {
          title: "风险短信",
          key: "riskMessage",
          render: (h, params) => {
            if (Number(params.row.riskMessage) === 1) {
              return h(
                "span",
                { style: this.redStyle },
                this.data.userTitle.isRisk
              );
            } else {
              return h(
                "span",
                { style: this.greenStyle },
                this.data.userTitle.noRisk
              );
            }
          }
        },
        {
          title: "已读",
          key: "messageRead",
          render: (h, params) => {
            return h(
              "span",
              Number(params.row.messageRead) === 1
                ? this.data.userTitle.haveRead
                : this.data.userTitle.unread
            );
          }
        },
        {
          title: "短信类型",
          key: "messageType",
          render: (h, params) => {
            if (Number(params.row.messageType) === 0) {
              return h(
                "span",
                { style: this.infoStyle },
                this.data.userTitle.receive
              );
            } else {
              return h(
                "span",
                { style: this.greenStyle },
                this.data.userTitle.send
              );
            }
          }
        },
        {
          title: "短信内容",
          key: "content",
          width: 200
        }
      ],
      UserNativeMessageInfo: [],
      messageSort: {
        sendOrAcceptTime: false,
        riskMessage: false
      },
      // 通话记录
      callRecordsForm: {
        totalItems: 0,
        page: 1,
        pageSize: 10,
        sortStr: "DESC",
        sortBy: "callTime"
      },
      UserCallRecordColumns: [
        {
          title: "通话时间",
          key: "callTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.callTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "手机号",
          key: "phone",
          width: 150
        },
        {
          title: "通话时长",
          key: "duration",
          render: (h, params) => {
            return h("div", this.secondToDate(params.row.duration));
          }
        },
        {
          title: "通话状态",
          key: "callType",
          render: (h, params) => {
            switch (params.row.callType) {
              case 1:
                return h(
                  "span",
                  { style: this.infoStyle },
                  this.data.userTitle.in
                );
                break;
              case 2:
                return h(
                  "span",
                  { style: this.greenStyle },
                  this.data.userTitle.out
                );
                break;
              case 3:
                return h(
                  "span",
                  { style: this.redStyle },
                  this.data.userTitle.no
                );
                break;
              default:
                return h(
                  "span",
                  { style: this.warningStyle },
                  this.data.userTitle.unknown
                );
                break;
            }
          }
        }
      ],
      UserCallRecordInfo: [],
      callRecordSort: {
        callTime: false,
        duration: false
      },
      //审核信息
      auditColumns: [
        {
          title: "审核时间",
          key: "auditTime",
          width: 180,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.auditTime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "阶段",
          key: "level",
          render: (h, params) => {
            return h("span", this.data.auditLevelText[params.row.level]);
          }
        },
        {
          title: "审核结果",
          key: "action",
          render: (h, params) => {
            return h("span", this.data.auditActionText[params.row.action]);
          }
        },
        {
          title: "审核人员姓名",
          key: "auditor"
        },
        {
          title: "审核意见",
          key: "remark"
        }
      ],
      auditInformation: [],
      historyLoanSort: {
        createTime: false
      },
      historyLoanForm: {
        totalItems: 0,
        page: 1,
        pageSize: 10,
        sortStr: "DESC"
      },
      historyLoanColumns: [
        {
          title: "操作",
          width: 60,
          render: (h, params) => {
            let showStyle = this.baseChannelShow ? "block" : "none";
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display: showStyle
                  },
                  on: {
                    click: () => {
                      this.modal3 = true;
                      detailListApi
                        .auditInfo({ orderId: params.row.id })
                        .then(res => {
                          res.forEach(item => {
                            item.auditTime = item.auditTime
                              ? moment(item.auditTime).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )
                              : "null";
                            item.level = this.data.auditLevelText[item.level];
                            item.action = this.data.auditActionText[
                              item.action
                            ];
                          });
                          this.auditRows = res;
                        });
                    }
                  }
                },
                this.data.userTitle.opera
              )
            ]);
          }
        },
        {
          title: "订单号",
          key: "id",
          width: 130
        },
        {
          title: "创建时间",
          key: "ctime",
          width: 170,
          render: (h, params) => {
            return h(
              "div",
              moment(params.row.ctime).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "审核结果",
          key: "orderStatus",
          width: 140,
          render: (h, params) => {
            return h("span", this.data.loanTypeText[params.row.orderStatus]);
          }
        },
        {
          title: "结清时间",
          key: "completeTime",
          width: 170,
          render: (h, params) => {
            return h(
              "div",
              params.row.completeTime
                ? moment(params.row.completeTime).format("YYYY-MM-DD HH:mm:ss")
                : "null"
            );
          }
        },
        {
          title: "还款次数",
          key: "repayCnt"
        },
        {
          title: "逾期天数",
          key: "overDue"
        }
      ],
      historyLoanInfo: [],
      //颜色、样式
      redStyle: {
        //红色
        color: "#ff4b58",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ff4b58",
        padding: "1px"
      },
      greenStyle: {
        //绿色
        color: "#2ed272",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2ed272",
        padding: "1px"
      },
      warningStyle: {
        //黄色
        color: "#ecc23d",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ecc23d",
        padding: "1px",
        borderRadius: "5px"
      },
      infoStyle: {
        //蓝色
        color: "#2d8cf0",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2d8cf0",
        padding: "1px"
      },
      colorText: {
        0: "info",
        1: "warning",
        2: "success",
        3: "error"
      },
      //工单单id
      ticketId: "", //用于提交试用
      //从初审、终审、还是我的案件来的
      indexForCome: 0,
      //订单id
      orderId: "", //用于查询订单详情
      //当前订单所属用户
      currentAuditor: "",
      //当前用户领取的工单总数
      totalCount: 1,
      //薪水对应的文案
      salaryText: {
        0: "0-2Juta", //0-2Juta
        1: "2-4 Juta", //2-4 Juta
        2: "4-6 Juta", //4-6 Juta
        3: "6-8 Juta", //6-8 Juta
        4: "8-10 Juta", //8-10 Juta
        5: ">10 Juta" //>10 Juta
      },
      role: 1, //角色初审
      type: 1, //默认是初审工单
      isCheck: false, //审核人员进来详情页 是可以审核的  false表示不是从订单列表点击查看过来的
      moneyData: "",
      isUsed: false, //身份证默认都是没有被使用过的
      otherAddressArr: [], //Lazada其他地址信息数组
      packageListArr: [
        {
          packages: [
            {
              key: "key1",
              title: "包裹状态"
            },
            {
              key: "key2",
              title: "配送状态"
            },
            {
              key: "key3",
              title: "卖家"
            }
          ],
          packageData: [],
          goods: [
            {
              key: "key1",
              title: "商品数量"
            },
            {
              key: "key2",
              title: "价格"
            },
            {
              key: "key3",
              title: "数量"
            }
          ],
          goodsData: []
        }
      ], //Lazada其他包裹信息数组
      orders: [], //所以订单
      wishLists: [], //所以收藏
      wishListArr: [
        {
          wish: [
            {
              key: "name",
              title: "心愿单名称"
            },
            {
              key: "total_item",
              title: "数量"
            }
          ],
          wishData: [
            {
              name: "key1",
              total_item: "key2"
            }
          ],
          goods: [
            {
              key: "name",
              title: "商品数量"
            },
            {
              key: "availability",
              title: "库存"
            },
            {
              key: "price",
              title: "价格"
            }
          ],
          goodsData: [
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            },
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            },
            {
              name: "key1",
              availability: "key2",
              price: "key3"
            }
          ]
        }
      ], //Lazad收藏信息数组
      //授权项的数目
      label1: h => {
        return h("div", [
          h("span", "Bank"),
          h("Badge", {
            props: {
              count: this.bankInfo.count || 0
            }
          })
        ]);
      },
      label2: h => {
        return h("div", [
          h("span", "E-commerce"),
          h("Badge", {
            props: {
              count: this.eCommerceInfo.count || 0
            }
          })
        ]);
      },
      label3: h => {
        return h("div", [
          h("span", "Rides"),
          h("Badge", {
            props: {
              count: this.ridesInfo.count || 0
            }
          })
        ]);
      },
      label4: h => {
        return h("div", [
          h("span", "SNS"),
          h("Badge", {
            props: {
              count: this.snsInfo.count || 0
            }
          })
        ]);
      },
      label5: h => {
        return h("div", [
          h("span", this.data.detailCardData[4].label)
          // h('Badge', {
          //     props: {
          //         count: (this.authorizedCount) || 0
          //     }
          // })
        ]);
      },
      bankInfo: {},
      eCommerceInfo: {},
      ridesInfo: {},
      snsInfo: {},
      authorizedCount: 0,
      //聚信利 Lazada
      lazada: {},
      lazadaOutInfo: [],
      lazadaCardObjArr: [],
      lazadaCardArr: [],
      //toko
      tokoOutInfo: [],
      tokoCardObjArr: [],
      tokoCardArr: [],
      //gojek
      gojekOutInfo: [],
      gojekCardObjArr: [],
      gojekCardArr: [],
      faceIdentificationData: {
        similarity: 0,
        comparisonCount: 0,
        advise: 1
      }
    };
  },
  components: {
    pinjaTable,
    pinjaTwoTable,
    expandRow
  },
  methods: {
    //获取剩余金额
    getMoney() {
      detailListApi.getMoney().then(res => {
        this.moneyData = res;
        console.log(res);
      });
    },
    // 精度矫正
    multiply(arg1, arg2) {
      var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
      try {
        m += s1.split(".")[1].length;
      } catch (e) {}
      try {
        m += s2.split(".")[1].length;
      } catch (e) {}
      return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
      );
    },
    goTop() {
      //回到顶部
      target.scrollIntoView();
    },
    //返回订单列表
    goBack() {
      localStorage.set("currentPath", "orderList");
      this.$router.push({ path: "/home/orderList", query: { isSearch: true } });
    },
    //切换一级tab
    clickTab(name) {
      this.value = name;
      //第一次切换调接口，再次切换不调接口
      switch (name) {
        case "0": //订单信息
          if (this.data.userOrderInfo[0].value === "")
            this.getDetailInformation(); //重新获取数据订单详情
          break;
        case "1": //用户信息
          if (this.data.userInfo[0].value === "") {
            this.getContactCount(); //获取联系次数
            this.userDetailFn(); //用户信息
          }
          if (this.UserNamePhoneInfo.length === 0) this.userNamePhoneList(); //通讯录列表
          if (this.UserNativeMessageInfo.length === 0) this.userMessageList(); //短信列表
          if (this.UserCallRecordInfo.length === 0) this.userCallRecordList(); //通话记录列表
          break;
        case "2":
          if (this.auditInformation.length === 0) this.auditInfoFn(); //审核信息
          break;
        case "3":
          if (this.historyLoanInfo.length === 0) this.historyLoanList(); //历史借贷
          break;
        case "4":
          // this.searchSpinder() //查询授权项
          this.getFaceIdentification();
          break;
      }
      //回到顶部
      target.scrollIntoView();
    },
    //切换二级tab
    changeSecondTab(name) {
      this.secondValue = name;
      switch (name) {
        case "second1": //bank
          break;
        case "second2": //commmerce
          this.thirdValue = this.eCommerceInfo.tabs[0].label;
          if (this.eCommerceInfo.data.length === 0)
            this.getCrawlingData(this.thirdValue);
          break;
        case "second3": //redis
          this.thirdValue = this.ridesInfo.tabs[0].label;
          if (this.ridesInfo.data.length === 0)
            this.getCrawlingData(this.thirdValue);
          break;
        case "second4": //sns
          break;
      }
    },
    //切换三级tab
    changeThirdTab(name) {
      this.thirdValue = name;
      switch (name) {
        case "lazada": //lazada
        case "tokopedia": //toko
          if (this.eCommerceInfo.data.length < this.eCommerceInfo.count)
            this.getCrawlingData(name);
          break;
        case "gojek": //gojek
          if (this.ridesInfo.data.length < this.ridesInfo.count)
            this.getCrawlingData(name);
          break;
      }
    },
    //翻译商品列
    translateProduct(parentIndex, childIndex) {
      let tableData = this.eCommerceInfo.data[parentIndex].cardArr[childIndex];
      if (tableData.coloumn[tableData.coloumn.length - 1].key !== "contentCh") {
        tableData.coloumn.push({
          key: "contentCh",
          title: "translate content",
          width: 190
        });
        let transformData = "";
        let transformArr = [];
        tableData.data.forEach((item, i) => {
          item.contentCh = "";
          let product =
            item[tableData.coloumn[tableData.coloumn.length - 2].title];
          if (typeof product !== "String") product = JSON.stringify(product);
          if (i !== tableData.data.length - 1)
            transformData += `${product}[^^]`;
          else transformData += product;
        });
        let param = {
          text: transformData,
          from: "in",
          to: "cn"
        };
        detailListApi.transition(param).then(res => {
          let result = "";
          if (res && res.data.length > 0) {
            for (let key of res.data) {
              result += key;
            }
          }
          transformArr = result.split("[^^]");
          tableData.data.forEach((item, i) => {
            item.contentCh = transformArr[i];
          });
          this.eCommerceInfo.data[parentIndex].cardArr[
            childIndex
          ].data = tableData.data.slice(0);
        });
      } else {
        this.eCommerceInfo.data[parentIndex].cardArr[childIndex].coloumn.pop();
      }
    },
    //查询授权项-计算各个类别的授权数目
    searchSpinder() {
      detailListApi.spinderInfo({ orderId: this.orderId }).then(res => {
        let authData = res.authDataSourceResponse;
        let bankInfo = {};
        let commerceInfo = {};
        let ridesInfo = {};
        let snsInfo = {};
        authData.forEach((item, index) => {
          let count = 0;
          let tabs = [];
          let userAuthDataSource = item.userAuthDataSource;
          userAuthDataSource.forEach(data => {
            if (data.authStatus === 2) {
              count++;
              tabs.push({ label: data.sourceName });
            }
          });
          switch (item.type) {
            case "Bank":
              bankInfo.count = count;
              bankInfo.tabs = tabs;
              bankInfo.data = [];
              break;
            case "ECommerce":
              commerceInfo.count = count;
              commerceInfo.tabs = tabs;
              commerceInfo.data = [];
              break;
            case "rides":
              ridesInfo.count = count;
              ridesInfo.tabs = tabs;
              ridesInfo.data = [];
              break;
            case "sns":
              snsInfo.count = count;
              snsInfo.tabs = tabs;
              snsInfo.data = [];
              break;
          }
        });
        this.bankInfo = bankInfo;
        this.eCommerceInfo = commerceInfo;
        this.ridesInfo = ridesInfo;
        this.snsInfo = snsInfo;
        if (this.bankInfo.count) this.authorizedCount += this.bankInfo.count;
        if (this.eCommerceInfo.count)
          this.authorizedCount += this.eCommerceInfo.count;
        if (this.ridesInfo.count) this.authorizedCount += this.ridesInfo.count;
        //获取授权项内容 默认展示ecommerce的第一个tab数据
        this.thirdValue = this.eCommerceInfo.tabs[0].label;
        this.getCrawlingData(this.eCommerceInfo.tabs[0].label);
      });
    },
    //根据电话号码查询订单id
    handleToLoanInfo(_orderId) {
      let target = this.$refs.targetdetail;
      target.setAttribute(
        "href",
        window.location.origin +
          `/home/taskPanel/detailList/${window.btoa(
            window.encodeURIComponent(_orderId)
          )}?isCheck=${this.isCheck}`
      );
      target.click();
      //   detailListApi.getOrderIdByPhone({ phoneNo: phoneNo }).then(res => {
      //     if (res) {
      //       // console.log(res)
      //       let _orderId = window.btoa(window.encodeURIComponent(res)); //加密res;
      //       let target = this.$refs.targetdetail;
      //     }
      //   });
    },
    //切换语言
    changeLanguage() {
      this.$i18n.locale = this.language;
      let tabsArr = this.$i18n.messages[this.$i18n.locale].message.detailList;
      //tabs
      this.$nextTick(() => {
        this.data = tabsArr;
        //user_info\banckend
        this.userPhotoColumns1.forEach((item, index) => {
          item.title = this.data.userPhotoTitle[index];
        });
        this.userPhotoColumns2.forEach((item, index) => {
          item.title = this.data.userPhotoTitle[index];
        });

        //紧急联系人列表表头
        this.EmergencyContactsColumns.forEach((item, index) => {
          item.title = this.data.userEmergencyContactsTitle[index];
        });

        //通讯录列表表头
        this.UserNameColumns.forEach((item, index) => {
          item.title = this.data.userCallBookTitle[index];
        });
        //短信列表表头
        this.UserMessageColumns.forEach((item, index) => {
          item.title = this.data.userMessageTitle[index];
        });
        //通话记录列表表头
        this.UserCallRecordColumns.forEach((item, index) => {
          item.title = this.data.userCallRecordTitle[index];
        });
        //审核信息
        this.auditColumns.forEach((item, index) => {
          item.title = this.data.auditInfoTitle[index];
        });
        //历史借贷
        this.historyLoanColumns.forEach((item, index) => {
          item.title = this.data.historyLoanTitle[index];
        });
        if (this.value === "1") {
          this.userMessageList();
        }
        this.clickTab(this.value);
      });

      //rejectReason
      this.data.rejectReason = []; //拒绝原因列表
      this.data.actionText = []; //操作列表
      this.data.auditForm = {}; //操作提交表单
      setTimeout(() => {
        this.data.rejectReason = tabsArr.rejectReason;
        this.data.auditForm = tabsArr.auditForm;
        this.data.actionText = tabsArr.actionText;
      }, 100);
    },
    //copyFn
    copyFn(param) {
      return JSON.parse(JSON.stringify(param));
    },

    //秒转化成 时分秒
    secondToDate(time) {
      let h, m, s, result;
      h = Math.floor(time / 3600);
      m = Math.floor((time / 60) % 60);
      s = Math.floor(time % 60);
      if (time < 60) {
        result = `${s} ${this.data.userTitle.s}`;
      } else if (time >= 60 && time < 3600) {
        result = `${m + this.data.userTitle.m} ${s} ${this.data.userTitle.s}`;
      } else {
        result = `${h} ${this.data.userTitle.h} ${m +
          this.data.userTitle.m} ${s} ${this.data.userTitle.s}`;
      }
      return result;
    },
    //获取联系次数
    getContactCount() {
      detailListApi.contactCount({ orderId: this.orderId }).then(res => {
        this.contactTime = res || {};
        //联系次数
        this.data.contactText[6].value =
          (this.contactTime && this.contactTime.time0) || 0;
        this.data.contactText[7].value =
          (this.contactTime && this.contactTime.time1) || 0;
      });
    },

    //记录通话是否打通(紧急联系人)
    handleCallRecordForEmer(contentNum, callStatus) {
      let param = {};
      param.orderId = this.orderId;
      param.phoneType = 1;
      if (contentNum == 1) {
        //联系人1
        param.phoneNo = this.data.contactText[4].value;
      } else {
        //联系人2
        param.phoneNo = this.data.contactText[5].value;
      }
      param.ecStatus = callStatus;

      detailListApi
        .addCallRecord({ content: JSON.stringify(param) })
        .then(res => {
          this.$Notice.success({ title: "Successed!" });
          this.userDetailFn();
        });
    },
    handleCallRecordForEmerList(phoneNo, callStatus) {
      let param = {};
      param.orderId = this.orderId;
      param.phoneType = 1;
      param.phoneNo = phoneNo;
      param.ecStatus = callStatus;

      detailListApi
        .addCallRecord({ content: JSON.stringify(param) })
        .then(res => {
          this.userDetailFn();
          this.$Notice.success({ title: "Successed!" });
        });
    },
    //记录通话是否打通(通讯录)
    handleCallRecordForCallBook(phoneNo, callStatus) {
      let param = {};
      param.orderId = this.orderId;
      param.phoneType = 2;
      param.phoneNo = phoneNo;
      param.ecStatus = callStatus;

      detailListApi
        .addCallRecord({ content: JSON.stringify(param) })
        .then(res => {
          this.$Notice.success({ title: "Successed!" });
          this.userNamePhoneList();
        });
    },

    //用户信息
    userDetailFn() {
      detailListApi.userDetail({ orderId: this.orderId }).then(res => {
        this.data.userInfo.forEach(item => {
          if (item.key === "gender") {
            //性别
            res[item.key] = this.data.genderText[res[item.key]];
          }
          if (item.key === "occupation") {
            //职业
            res[item.key] = this.data.occupationText[res[item.key]];
          }

          if (item.key === "salary") {
            //薪水
            res[item.key] = this.salaryText[res[item.key]];
          }

          if (item.key === "education") {
            //学历
            res[item.key] = this.data.educationText[res[item.key]];
          }
          if (item.key === "purpose") {
            //借款目的
            res[item.key] = this.data.purposeText[res[item.key]];
          }

          item.value = res[item.key] || "";
        });

        //联系人信息
        this.data.contactText[0].value =
          (res.oldContacts[0] && res.oldContacts[0].name) || "";
        this.data.contactText[1].value =
          (res.oldContacts[1] && res.oldContacts[1].name) || "";
        this.data.contactText[2].value =
          (res.oldContacts[0] &&
            this.data.relationText[res.oldContacts[0].relation]) ||
          "";

        this.data.contactText[3].value =
          (res.oldContacts[1] &&
            this.data.relationText[res.oldContacts[1].relation]) ||
          "";


        //电话号码
        this.data.contactText[4].value =
          (res.oldContacts[0] && res.oldContacts[0].phoneNo) || "";

        this.data.contactText[5].value =
          (res.oldContacts[1] && res.oldContacts[1].phoneNo) || "";


        this.EmergencyContactsInfo = res.newContacts;
        //接通状态
        if (this.isCallRecordVisi) {
          this.emergencyContact.firstStatus =
            res.oldContacts[0] && res.oldContacts[0].ecStatus == 0;
          this.emergencyContact.secondStatus =
            res.oldContacts[1] && res.oldContacts[1].ecStatus == 0;
        } else {
          this.emergencyContact.firstStatus = false;
          this.emergencyContact.secondStatus = false;
        }
        this.emergencyContact.firstNum =
          res.oldContacts[0] && res.oldContacts[0].ecStatus;
        this.emergencyContact.secondNum =
          res.oldContacts[1] && res.oldContacts[1].ecStatus;



        //照片信息
        this.userPhotoData1 =
          JSON.stringify(res.oldImages) === "{}" ? [] : [res.oldImages];
        this.userPhotoData2 =
          JSON.stringify(res.newImages) === "{}" ? [] : [res.newImages];
      });
    },
    //通讯录
    userNamePhoneList() {
      let param = this.copyFn(this.userNameForm);

      param.orderId = this.orderId; //this.orderId

      delete param.totalItems;
      detailListApi.callBooksList(param).then(res => {
        //table
        this.UserNameColumns.forEach((item, i) => {
          item.title = this.data.userCallBookTitle[i];
        });
        this.UserNamePhoneInfo = (res && res.content) || [];
        //分页
        this.userNameForm.totalItems = (res && res.totalElements) || 0;
        //排序
        this.userNameSort[res.sortBy[0]] = res.sortStr[0] || false; //以电话或者联系次数为依据排序

        //平台用户数量
        this.ourUserCount = res.ourUserCount || 0;
        this.validNumCount = res.validCount || 0;
        this.invalidNumcount = res.invalidCount || 0;
      });
    },
    //通讯录-按电话号码排序
    userNameSortByPhone() {
      this.userNameForm.sortStr = !this.userNameSort.phone ? "ASC" : "DESC";
      this.userNameForm.sortBy = "phone";
      this.userNamePhoneList();
    },
    //通讯录-按联系次数排序
    userNameSortByCount() {
      this.userNameForm.sortStr = !this.userNameSort.count ? "ASC" : "DESC";
      this.userNameForm.sortBy = "count";
      this.userNamePhoneList();
    },
    sortChangeLocalCallBook(column) {
      this.userNameForm.sortBy = column.key || "count";
      if (column.order === "normal") {
        column.order = "DESC";
        this.userNameForm.sortBy = "count";
      }
      this.userNameForm.sortStr =
        (column.order && column.order.toUpperCase()) || "DESC";
      this.userNamePhoneList();
    },
    //翻译短信服务
    translateFn(UserNativeMessageInfo) {
      if (
        this.UserMessageColumns[this.UserMessageColumns.length - 1].key !==
        "contentCh"
      ) {
        this.UserNativeMessageInfo = [];
        this.UserMessageColumns.push({
          title: "短信翻译",
          key: "contentCh",
          width: 200
        });
        if (UserNativeMessageInfo.length > 0) {
          this.UserMessageColumns.forEach((item, i) => {
            item.title = this.data.userMessageTitle[i];
          });
          let transformData = "";
          let transformArr = [];
          UserNativeMessageInfo.forEach((item, i) => {
            item.contentCh = "";
            if (i !== UserNativeMessageInfo.length - 1)
              transformData += `${item.content}[^]`;
            else transformData += item.content;
          });
          let param = {
            text: transformData,
            from: "in",
            to: "cn"
          };
          detailListApi.transition(param).then(res => {
            let result = "";
            if (res && res.data.length > 0) {
              for (let key of res.data) {
                result += key;
              }
            }
            transformArr = result.split("[^]");
            UserNativeMessageInfo.forEach((item, i) => {
              item.contentCh = transformArr[i];
            });
            this.UserNativeMessageInfo = UserNativeMessageInfo;
          });
        }
      } else {
        return;
      }
    },
    //本地短信列表
    userMessageList() {
      let param = this.copyFn(this.userMessageForm);
      param.orderId = this.orderId;
      delete param.totalItems;
      detailListApi.messagesList(param).then(res => {
        //table
        let UserNativeMessageInfo = (res && res.content) || [];
        this.UserNativeMessageInfo = UserNativeMessageInfo;
        if (
          this.UserMessageColumns[this.UserMessageColumns.length - 1].key ==
          "contentCh"
        ) {
          this.UserMessageColumns.pop();
        }

        //分页
        this.userMessageForm.totalItems = (res && res.totalElements) || 0;
        //排序
        this.messageSort[res.sortBy[0]] = res.sortStr[0] || false;
        if (res.sortBy[1]) {
          //如果按照风险短信降序排列 收发时间就是降序排序
          this.messageSort[res.sortBy[1]] = false;
        }
      });
    },
    //短信排序-收发时间
    messageSortByTimeFn() {
      this.userMessageForm.sortStr = !this.messageSort.sendOrAcceptTime
        ? "ASC"
        : "DESC";
      this.userMessageForm.sortBy = "sendOrAcceptTime";
      this.userMessageList();
    },
    //短信排序-风险短信
    messageSortByRiskFn() {
      this.userMessageForm.sortStr = "DESC";
      this.userMessageForm.sortBy = "riskMessage";
      this.userMessageList();
    },
    //通话记录列表
    userCallRecordList() {
      let param = this.copyFn(this.callRecordsForm);
      param.orderId = this.orderId;
      delete param.totalItems;
      detailListApi.callRecordsList(param).then(res => {
        //table
        this.UserCallRecordColumns.forEach((item, i) => {
          item.title = this.data.userCallRecordTitle[i];
        });
        this.UserCallRecordInfo = (res && res.content) || [];
        //分页
        this.callRecordsForm.totalItems = (res && res.totalElements) || 0;
        //排序
        this.callRecordSort[res.sortBy[0]] = res.sortStr[0] || false; //以通话时间或通话时长为依据排序
      });
    },
    //通话记录排序-通话时间
    callRecordByTime() {
      this.callRecordsForm.sortStr = !this.callRecordSort.callTime
        ? "ASC"
        : "DESC";
      this.callRecordsForm.sortBy = "callTime";
      this.userCallRecordList();
    },
    //通话记录排序-通话时长
    callRecordByDuration() {
      this.callRecordsForm.sortStr = !this.callRecordSort.duration
        ? "ASC"
        : "DESC";
      this.callRecordsForm.sortBy = "duration";
      this.userCallRecordList();
    },
    //改变页码-用户姓名、电话号码列表
    changePage1(page) {
      this.userNameForm.page = page;
      this.userNamePhoneList();
    },
    //改变每页显示数量-用户姓名、电话号码列表
    changeSize1(size) {
      this.userNameForm.pageSize = size;
      this.userNamePhoneList();
    },
    //改变页码-本地短信列表
    changePage2(page) {
      this.userMessageForm.page = page;
      this.userMessageList();
    },
    //改变每页显示数量-本地短信列表
    changeSize2(size) {
      this.userMessageForm.pageSize = size;
      this.userMessageList();
    },
    //改变页码-通话记录列表
    changePage3(page) {
      this.callRecordsForm.page = page;
      this.userCallRecordList();
    },
    //改变每页显示数量-通话记录列表
    changeSize3(size) {
      this.callRecordsForm.pageSize = size;
      this.userCallRecordList();
    },
    //改变页码-历史借贷列表
    changePage4(page) {
      this.historyLoanForm.page = page;
      this.historyLoanList();
    },
    //改变每页显示数量-历史借贷列表
    changeSize4(size) {
      this.historyLoanForm.pageSize = size;
      this.historyLoanList();
    },
    //历史借贷排序-创建时间
    historyLoanByTime() {
      this.historyLoanSort.createTime = !this.historyLoanSort.createTime;
      this.historyLoanForm.sortStr = this.historyLoanSort.createTime
        ? "ASC"
        : "DESC";
      this.historyLoanList();
    },
    //历史借贷列表
    historyLoanList() {
      let param = this.copyFn(this.historyLoanForm);
      param.orderId = this.orderId;
      delete param.totalItems;
      detailListApi.historyOrderList(param).then(res => {
        if (res && res.orderOverDueInfoList.length > 0) {
          this.historyLoanInfo = res.orderOverDueInfoList;
          //分页
          this.historyLoanForm.totalItems = res.totalElements;
        } else {
          this.$Notice.success({ desc: this.data.tableNoText });
        }
      });
    },
    //订单信息
    getDetailInformation() {
      detailListApi.ordersDetail({ orderId: this.orderId }).then(res => {
        //订单信息
        this.data.userOrderInfo.forEach(item => {
          //借款状态国际化
          if (item.key === "orderStatus") {
            //贷款状态
            res.orderDetail[item.key] = this.data.loanTypeText[
              res.orderDetail[item.key]
            ];
          }

          if (item.key === "days") {
            //借款天数
            res.orderDetail[item.key] = `${res.orderDetail[item.key]}${
              this.data.loanDay
            }`;
          }

          if (item.key === "rate") {
            //利率
            res.orderDetail[item.key] = `${this.data.rate} ${this.multiply(
              res.orderDetail[item.key],
              100
            )}%`;
          }

          if (item.key === "rateType") {
            //计息方式
            res.orderDetail[item.key] = this.data.rateTypeText[
              res.orderDetail[item.key]
            ];
          }

          if (item.key === "orderTime") {
            //申请时间
            res.orderDetail[item.key] = moment(
              res.orderDetail[item.key]
            ).format("YYYY-MM-DD HH:mm:ss");
          }

          item.value = res.orderDetail[item.key];
        });
        //放款银行账号
        this.data.userBankInfo.forEach(item => {
          // if (item.key === 'authStatus') { //姓名校验
          //     this.isSuccess = res.payAccountInfo[item.key]
          //     item.color = this.colorText[this.isSuccess]
          //     res.payAccountInfo[item.key] = this.data.nameValid[res.payAccountInfo[item.key]]
          // }
          item.value = res.payAccountInfo[item.key];
        });
        ////银行账户姓名与申请人姓名校验
        this.bankCheck();

        //还款银行账号信息
        if (res.repayAccountInfo.length > 0) {
          this.isHavePayHistory = true;
          this.repayAccountInfo = [];
          let repayAccountInfo = res.repayAccountInfo;
          let arr = [];
          repayAccountInfo.forEach(item => {
            let obj1 = {
              label: this.data.userPayInfo[0].label,
              value: item.repayAccount
            };
            let obj2 = {
              label: this.data.userPayInfo[1].label,
              value: item.repayBankCode
            };
            arr = arr.concat(obj1).concat(obj2);
          });
          this.repayAccountInfo = arr;
        } else {
          this.isHavePayHistory = false;
        }

        //用户标签
        this.repeatOrderInfo = res.repeatOrderInfo;

        //判断该身份证已被使用，只能选择拒绝操作
        this.isUsed = res.refuse === "1"; //1表示已使用、0表示未使用

        //获取渠道id
        this.channelId = res.channelId;
      });
    },
    //银行账户姓名与申请人姓名校验
    bankCheck() {
      detailListApi.bankCheck({ orderId: this.orderId }).then(res => {
        this.bankCheckDataSource = res;
      });
    },

    //命中规则
    hitRiskFn() {
      detailListApi.riskDetail({ orderId: this.orderId }).then(res => {
        let highRisk = res.high; //高风险
        let lowRisk = res.low; //低风险
        let advance = res.advance; //第三方
        if (highRisk.length > 0) {
          for (let item of this.highRiskArr) {
            if (highRisk.includes(item.value)) item.key = true;
            this.isHaveHighRisk = true;
          }
        }
        if (lowRisk.length > 0) {
          for (let item of this.lowRiskArr) {
            if (lowRisk.includes(item.value)) item.key = true;
            this.isHaveLowRisk = true;
          }
        }
        if (advance.length > 0) {
          this.isHaveThirdRisk = true;
          for (let items of advance) {
            if (items.advanceUser) {
              //如果用户信息命中
              let temp = JSON.parse(items.advanceUser);
              this.advanceUser.forEach(item => {
                item.value = temp[item.key];
              });
            } else if (items.advanceCompany) {
              //如果公司信息命中
              let temp = JSON.parse(items.advanceCompany);
              for (let company of temp) {
                let arr = [];
                arr.push(
                  {
                    key: "companyName",
                    value: company.companyName
                  },
                  {
                    key: "landLine",
                    value: company.landLine
                  },
                  {
                    key: "address",
                    value: company.address
                  }
                );
                this.advanceCompanys.push(arr);
              }
            }
          }
        }
      });
    },
    //审核信息
    auditInfoFn() {
      detailListApi.auditInfo({ orderId: this.orderId }).then(res => {
        this.auditInformation = res;
      });
    },

    //数据抓取订单信息重组
    crawlingOrderDataLa(data) {
      let arr = [];
      data.forEach(items => {
        //基本信息、配送地址、账单地址、包裹信息
        let baseData = this.data.crawlingBaseOrderDataLa;
        let deliveryData = this.data.crawlingOrderDeliveryDataLa;
        let billsData = this.data.crawlingOrderBillsDataLa;
        let packageListArr = this.packageListArr;
        let packageData = this.data.crawlingOrderPackageDataLa;
        let goodData = this.data.crawlingOrderPackageGoodDataLa;
        let packArr = [];
        baseData.forEach(item => {
          item.value = items[item.key];
        });
        deliveryData.forEach(item => {
          item.value = items.shipping_address[item.key];
        });
        billsData.forEach(item => {
          item.value = items.billing_address[item.key];
        });
        //多个包裹
        for (let i = 0; i < items.packages.length; i++) {
          packageListArr.forEach(item => {
            item.packages.forEach((pack, j) => {
              pack.title = packageData[j].label;
              pack.key = packageData[j].key;
            });
            item.packageData = [
              {
                status: items.packages[i].status,
                shipping: items.packages[i].shipping,
                sold_by: items.packages[i].sold_by
              }
            ];
            item.goodsData = items.packages[i].goods;

            item.goods.forEach((good, k) => {
              good.title = goodData[k].label;
              good.key = goodData[k].key;
            });
          });
          packArr.push(packageListArr);
          packageListArr = this.packageListArr;
        }
        arr.push({
          baseData: baseData,
          deliveryData: deliveryData,
          billsData: billsData,
          packageListArr: packArr
        });
      });
      return arr;
    },

    //数据抓取收藏数据重组
    crawlingWishDataLa(data) {
      let arr = [];
      data.forEach(items => {
        let collData = this.data.crawlingOrderCollDataLa;
        let goodData = this.data.crawlingOrderPackageGoodDataLa;
        let wishListArr = this.wishListArr;
        let collArr = [];
        //多个收藏
        wishListArr.forEach(item => {
          item.wish.forEach((pack, j) => {
            pack.title = collData[j].label;
            pack.key = collData[j].key;
          });
          item.wishData = [
            {
              total_item: items.total_item,
              name: items.name
            }
          ];
          item.goodsData = items.items;

          item.goods.forEach((good, k) => {
            good.title = goodData[k].label;
            good.key = goodData[k].key;
          });
        });
        collArr.push(wishListArr);
        arr.push({
          wishListArr: collArr
        });
      });
      return arr;
    },
    //获取爬取的数据
    getCrawlingData(source) {
      //同盾数据源-暂时不用-res数据已删除,以后接入
      // let task_data = res.task_data
      // let personal_info = task_data.personal_info //个人信息
      // let data = task_data.orders //订单信息
      // let wish = task_data.wishlist //收藏
      // let address = task_data.address_book //地址信息

      // let shipping_address = address.shipping_address //配送信息
      // let billing_address = address.billing_address //账单信息
      // let other_address = address.other_address //其他地址信息

      // personal_info.real_name = res.real_name
      // personal_info.identity_code = res.identity_code

      // this.data.crawlingBaseDataLa.forEach(item => {
      //     item.value = personal_info[item.key]
      // })
      // this.data.crawlingAddrDeliveryDataLa.forEach(item => {
      //     item.value = shipping_address[item.key]
      // })
      // this.data.crawlingAddrBillsDataLa.forEach(item => {
      //     item.value = billing_address[item.key]
      // })
      // for (let i = 0; i < other_address.length; i++) {
      //     let other = this.data.crawlingAddrOtherDataLa
      //     other.forEach(item => {
      //         item.value = other_address[i][item.key]
      //     })
      //     this.otherAddressArr.push(other)
      // }

      // this.orders = this.crawlingOrderDataLa(data)
      // this.wishLists = this.crawlingWishDataLa(wish)
      //获取授权项的内容
      let param = {
        orderId: this.orderId,
        source: source
      };
      let resData = {};
      detailListApi.searchSpinderContent(param).then(res => {
        resData = res;
        let obj = {};
        let juxinli_res = resData.riskData;
        juxinli_res.source = resData.source;
        juxinli_res.userId = resData.userId;
        obj = this.loopFn(juxinli_res);
        switch (source) {
          case "lazada": //lazada数据
            this.eCommerceInfo.data.push(obj);
            break;
          case "tokopedia": //toko数据
            this.eCommerceInfo.data.push(obj);
            break;
          case "gojek": //gojek数据
            this.ridesInfo.data.push(obj);
            break;
        }
      });
    },
    //loopFn
    loopFn(resData) {
      let outInfo = []; //最外层
      let cardObjArr = []; //对象
      let cardArr = []; //数组
      let obj = {}; //最终返回的对象
      for (let key in resData) {
        //最外层数据
        if (
          typeof resData[key] === "string" ||
          resData[key] === null ||
          typeof resData[key] === "number"
        ) {
          if (key.includes("time")) {
            resData[key] = moment(Number(resData[key])).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          outInfo.push({
            label: key,
            value: resData[key]
          });
        } else if (!(resData[key] instanceof Array)) {
          //对象类型
          let card1 = {};
          for (let key1 in resData[key]) {
            if (!card1.title) {
              card1.title = key;
              card1.content = [];
            }
            card1.content.push({
              label: key1,
              value: resData[key][key1]
            });
          }
          cardObjArr.push(card1);
        } else if (resData[key] instanceof Array) {
          //数组类型
          //数组中包含对象，每个对象里包含 字符串类型、数组类型、对象类型
          let tempArr = resData[key];
          let coloumn = [];
          let objArr = [];
          let arr = [];
          let keyNumber = (tempArr[0] && Object.keys(tempArr[0]).length) || 0;
          for (let key2 in tempArr[0]) {
            let temp = tempArr[0][key2];
            if (!(temp instanceof Array)) temp = JSON.stringify(temp);
            let len = temp.length;
            if (temp instanceof Array) len = 21;
            if (len > 20) {
              coloumn.push({
                title: key2,
                key: key2,
                width: 190
              });
            } else {
              coloumn.push({
                title: key2,
                key: key2
              });
            }
          }
          if (keyNumber > 6) {
            //让表格title多的能够正常显示、显示滚动条
            coloumn.forEach(item => {
              item.width = 150;
            });
          }
          tempArr.forEach(item => {
            //对字段中有时间的单独处理
            for (let timeKey in item) {
              if (timeKey.indexOf("time") !== -1) {
                item[timeKey] = moment(Number(item[timeKey])).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
              }
            }
          });
          cardArr.unshift({
            title: key, //整个类目的title
            coloumn: coloumn, //table数据
            data: tempArr //table数据
          });
        }
      }
      obj = {
        outInfo: outInfo || [],
        cardObjArr: cardObjArr || [],
        cardArr: cardArr || []
      };
      return obj;
    },
    //提交审核
    submit() {
      this.modal2 = true;
    },
    confirm1() {
      this.modal1 = false;
    },
    confirm2() {
      this.loading = true;
      //1  通过  2 拒绝
      let remark = [];
      let params = {};
      let fn = null;
      if (this.data.auditForm.status === "1") {
        this.data.auditForm.remark === ""
          ? remark.push("no remark")
          : remark.push(this.data.auditForm.remark);
      } else {
        remark.push(this.data.auditForm.rejectReason);
        if (this.data.auditForm.remark !== "")
          remark.push(this.data.auditForm.remark);
        //如果身份证已经使用过  末尾追加 '该身份证已被使用，只能选择拒绝操作'
        if (this.isUsed) remark.push(this.data.hitRiskText.isBind);
      }
      params = {
        status: this.data.auditForm.status,
        remark: remark.join(",")
      };
      this.type === 1
        ? (params.preAuditTicketId = this.ticketId)
        : (params.finalAuditTicketId = this.ticketId);
      fn =
        this.type === 1
          ? detailListApi.auditPreOrders(params)
          : detailListApi.auditFinalOrders(params);
      fn.then(res => {
        //如果是初审、同时该身份证已经使用过
        if (this.type === 1 && res.businessCode === "0004") {
          this.$Notice.error({ desc: this.data.hitRiskText.isBind });
          this.loading = false;
          this.modal2 = false;
          return;
        }
        if (res.businessCode === "0005") {
          //同时领取多个工单，在一个页面释放后，在其他页面审核时的提示信息
          this.$Notice.warning({ desc: this.data.userTitle.auditWarning });
          this.loading = false;
          return;
        }
        this.loading = false;
        this.modal1 = false;

        //记录当前操作的订单信息(设置当前操作信息为null)
        localStorage.set("currentOrderInfo", null);
        if (this.type === 1 && this.indexForCome != 3) {
          this.modal5 = true;
        } else {
          localStorage.set("currentPath", "taskPanel");
          this.$router.push("/home/taskPanel");
        }
      });
    },
    //审核下一单
    auditNext() {
      this.modal5 = false;
      //如果还有剩余工单则自动领取下一工单
      let ticketId = ""; //工单id
      let orderId = ""; // 订单id
      let auditorName = ""; //当前工单的所属人员
      let count = 0; //当前用户所领取的工单数目
      taskPanelApi.preAudit().then(res => {
        //如果没有剩余工单 直接跳转到任务面板

        if (res.count > 0) {
          ticketId = res.ticketId;
          orderId = res.orderId;
          auditorName = res.auditorName;
          count = res.count;
          //将三级面包屑存入store
          this.$store.commit("CHANGE_THIRD_BREAD", orderId);
          //二级面包屑存入store \ localstorage
          localStorage.set("currentPath", "detailList");
          let param = `ticketId=${ticketId}&type=${this.type}&auditorName=${auditorName}&count=${count}&index=1`;
          param = window.btoa(window.encodeURIComponent(param)); //加密
          //记录当前操作的订单信息
          localStorage.set("currentOrderInfo", param);

          orderId = window.btoa(window.encodeURIComponent(orderId)); //加密
          this.$router.push({
            path: `/home/taskPanel/detailList/${orderId}`,
            query: { param: param } //加密
          });
          //刷新的目的是让用户感知到又领取了下一单
          window.location.reload();
        } else if (res.data == null) {
          //判断空对象
          localStorage.set("currentPath", "taskPanel");
          this.$router.push("/home/taskPanel");
          return;
        }
      });
    },
    cancel() {
      this.modal2 = false;
      this.loading = false;
    },
    //获取人脸对比信息
    getFaceIdentification() {
      detailListApi.faceMatching({ orderId: this.orderId }).then(res => {
        this.faceIdentificationData = res;
      });
    }
  },
  computed: {
    ...mapState({
      language: state => state.module.language
    })
  },
  watch: {
    language() {
      this.changeLanguage();
    },
    channelId(val) {
      //根据渠道来判断是否显示短信列表
      this.baseChannelShow = val == 13 ? false : true;
    }
  },
  mounted() {
    let user = localStorage.get("user");
    this.role = user && user.role;
    //订单号解密
    this.orderId =
      window.decodeURIComponent(window.atob(this.$route.params.orderNo)) || "";
    this.$store.commit("CHANGE_THIRD_BREAD", this.orderId);
    let query = this.$route.query;
    this.isCheck = query.isCheck || false;

    if (query.param) {
      //查询参数解密
      let param = window.decodeURIComponent(window.atob(query.param)); //解密this.$route.query.param
      let tempArr = param.split("&");
      tempArr.forEach((item, i) => {
        tempArr[i] = item.split("=");
      });
      this.ticketId = tempArr[0][1] || "";
      this.type = Number(tempArr[1][1]) || 1;
      this.indexForCome = Number(tempArr[4][1]) || 0;
      if (!this.isCheck) {
        this.currentAuditor = tempArr[2][1];
        this.totalCount = tempArr[3][1];
        this.modal4 = this.totalCount > 10;
        if (this.type === 2) {
          this.getMoney();
        }
      }
    }
    this.changeLanguage();
    //命中规则
    this.hitRiskFn();
    //数据爬取授权项
    this.searchSpinder();

    this.isCallRecordVisi = localStorage.get("currentOrderInfo") != null;
  }
};
</script>
<style lang="less">
.detailVal {
  margin-right: 10px;
  position: relative;
  height: auto;
  .moneyData {
    position: fixed;
    top: 10px;
    left: 530px;
    font-weight: bold;
    color: #fa2500;
    font-size: 16px;
  }
  .ticket-warning {
    position: fixed;
    top: 54px;
    right: 0;
    p {
      vertical-align: middle;
      font-size: 16px;
      span {
        margin-right: 15px;
      }
    }
  }
  .tabpane {
    margin-top: 55px;
  }
  .tabpanechild {
    margin-top: 5px;
    .advance {
      padding: 25px;
    }
  }
  .loan-time {
    position: fixed;
    top: 54px;
    left: 48%;
    span {
      display: inline-block;
      min-width: 40px;
      height: 30px;
      line-height: 30px;
      padding: 0 5px;
      border: 1px solid #ddd;
      margin-right: 10px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 800;
      text-align: center;
      color: #fff;
      position: relative;
      cursor: pointer;
      p {
        display: none;
        position: absolute;
        top: -50px;
        left: 2px;
        z-index: 99;
        border: 1px solid #ddd;
        background: #3890ee;
        padding: 4px;
        border-radius: 5px;
      }
      &:hover p {
        display: block;
        white-space: nowrap;
        padding: 5px 10px;
      }
    }
    .total {
      background: #31cc00;
    }
    .day {
      background: #fa2500;
    }
    .loan {
      background: #346f9b;
    }
  }
  .risk-position {
    position: fixed;
    top: 90px;
    z-index: 100;
    width: 100%;
  }
  .hit-rules {
    .none {
      border: 1px solid #ddd;
      color: #ddd;
      padding: 5px;
      border-radius: 5px;
      margin: 0 10px;
    }
    .disk {
      border: 1px solid #fa2500;
      color: #ff2500;
      background: #f5f7f9;
      padding: 5px;
      border-radius: 5px;
      margin: 0 10px;
    }
    .danger {
      border: 1px solid #fff23d;
      color: #fff23d;
      padding: 5px;
      border-radius: 5px;
    }
    .rules-content {
      z-index: 1000;
      p {
        line-height: 30px;
        margin-left: 20px;
        font-size: 14px;
      }
    }
  }
  .back-top-bt {
    width: 27px;
    height: 27px;
    padding: 2px;
    background: #346f9b;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    position: fixed;
    right: 18px;
    bottom: 60px;
    z-index: 100;
  }
  .back-bt {
    position: fixed;
    right: 18px;
    top: 55px;
  }
  .detail-card {
    .title-label {
      font-size: 16px;
      padding-left: 15px;
      height: 35px;
      line-height: 35px;
    }
    .user-info {
      padding-left: 15px;
      .user-col {
        margin-bottom: 20px;
        height: 15px;
        .info-label {
          text-align: right;
          width: 36%;
          display: inline-block;
          // word-wrap: break-word;
          // word-break: normal;
          white-space: nowrap;
        }
        .address {
          width: 18%;
        }
        .info-value {
          margin-left: 20px;
          word-wrap: break-word;
          word-break: break-all;
          .isOk {
            border: 1px solid #2ed272;
            border-radius: 5px;
            color: #2ed272;
            padding: 5px;
          }
          .isError {
            border: 1px solid #ff4b58;
            border-radius: 5px;
            color: #ff4b58;
            padding: 5px;
          }
          .isInfor {
            border: 1px solid #2d8cf0;
            border-radius: 5px;
            color: #2d8cf0;
            padding: 5px;
          }
          .isWarning {
            border: 1px solid #ecc23d;
            border-radius: 5px;
            color: #ecc23d;
            padding: 5px;
          }
        }
      }
    }
    .sort {
      margin-bottom: 10px;
      position: relative;
      .translate {
        position: absolute;
        right: 60px;
      }
    }
    .phone-audit {
      margin: 20px 0;
      font-weight: bold;
    }
  }
  .ivu-tabs-nav-container {
    position: fixed;
    top: 130px;
    z-index: 80;
    width: 90%;
    background: #fffffe;
  }
  .data-crawl .ivu-tabs-nav-container {
    position: fixed;
    top: 60px;
    z-index: 2000;
  }
  .crawl-commerce .limit-height {
    max-height: 200px;
    overflow: scroll;
  }
  .crawl-commerce .ivu-tabs-nav-container {
    position: fixed;
    top: 70px;
    z-index: 3000;
  }
  .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    margin-right: 0;
  }
}

.auditAgree {
  position: fixed;
  bottom: 60px;
  width: 95%;
  height: 120px;
  vertical-align: middle;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
  background: #f5f7f9;
  padding: 0 50px;
  .user-input-search {
    padding-top: 2px;
    .user-input-label {
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
    }
    .user-input {
      width: 200px;
      margin-right: 5px;
    }

    .ivu-collapse-content > .ivu-collapse-content-box {
      max-height: 500px;
      overflow: scroll;
    }

    .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
      background-color: #346f9b;
      color: #fff;
    }

    .ivu-table td.demo-table-hover-column .ivu-table-cell img {
      width: 200px;
      height: 200px;
      text-align: center;
      padding: 5px;
    }
    .mark {
      width: 70%;
      margin-top: 5px;
    }
    .submit-bt {
      width: 100px;
      margin-left: 10px;

      .order-h {
        max-height: 500px;
        overflow: scroll;
      }
    }
  }
}
.show {
  position: fixed;
  right: 0;
  bottom: 60px;
  height: 120px;
  background-color: #346f9b;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 20px;
  margin-left: 20px;
  //   background: #2d8cf0;
  line-height: 120px;
  text-align: center;
}
.isShowColor {
  background: #fff;
  border: 0;
  z-index: -1;
}
.ivu-table td.demo-table-hover-column .ivu-table-cell img {
  width: 200px;
  height: 200px;
  text-align: center;
  padding: 5px;
}

.ivu-collapse-content > .ivu-collapse-content-box {
  max-height: 500px;
  overflow: scroll;
}

.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  background-color: #346f9b;
  color: #fff;
}
.ivu-btn-primary {
  background-color: #346f9b;
  border-color: #346f9b;
}

.order-h {
  max-height: 500px;
  overflow: scroll;
}

.modal-photo {
  width: 900px;
  height: auto;
}
.m-t-90 {
  margin-top: 90px;
}
.red-color {
  color: #fa2500;
}
.green-color {
  color: #31cc00;
}
.callSelected {
  display: inline-block;
  border: 5px solid #d242f6;
}
</style>
