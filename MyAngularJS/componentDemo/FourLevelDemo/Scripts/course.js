'use strict';
(function () {

    var app = angular.module('managementApp');
    
    app.controller('studyUnitDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'data', function ($scope, $http, $uibModalInstance, dialogs, data) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.studyunit = data.studyunit;
        if (data.studyunit.unitId) {
            $scope.save = function () {
                $scope.processing = 1;
                $http.put('/api/courses/studyunit', {
                    courseId: $scope.studyunit.courseId,
                    unitId: $scope.studyunit.unitId,
                    unitName: $scope.studyunit.unitName,
                    unitSequence: $scope.studyunit.unitSequence,
                }).success(function (data) {
                    if (!data.hasError) {
                        tips.init({ tipsMsg: '编辑单元成功' });
                        $uibModalInstance.close();
                    } else {
                        tips.init({tipsMsg: data.message});
                    }
                }).error(function (data, status) {
                    
                }).finally(function () {
                    $scope.processing = 0;
                });
            };
        } else {
            $scope.save = function () {
                $scope.processing = 1;
                $scope.studyunit = $scope.studyunit || {};
                $http.post('/api/courses/studyunit', {
                    courseId: data.studyunit.courseId,
                    unitName: $scope.studyunit.unitName,
                    unitSequence: $scope.studyunit.unitSequence,
                }).success(function (data) {
                    if (!data.hasError) {
                        tips.init({ tipsMsg: '添加单元成功' });
                        $uibModalInstance.close();
                    } else {
                        tips.init({tipsMsg: data.message});
                    }
                }).error(function (data, status) {

                }).finally(function () {
                    $scope.processing = 0;
                });
            };
        }
    }]);

    app.controller('lessonDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'data', function ($scope, $http, $uibModalInstance, dialogs, data) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.lesson = data.lesson;
        if (data.lesson.lessonId) {
            $scope.save = function () {
                $scope.processing = 1;
                $http.put('/api/courses/lesson', {
                    courseId: data.lesson.courseId,
                    lessonId: data.lesson.lessonId,
                    lessonName: $scope.lesson.lessonName,
                    lessonSequence: $scope.lesson.lessonSequence,
                    lessonType: data.lesson.lessonType,
                    unitId: data.lesson.unitId,
                }).success(function (data) {
                    if (!data.hasError) {
                        tips.init({ tipsMsg: '编辑课节成功' });
                        $uibModalInstance.close();
                    } else {
                        tips.init({tipsMsg: data.message});
                    }
                }).finally(function () {
                    $scope.processing = 0;
                });
            };
        } else {
            $scope.lesson = $scope.lesson || {};
            $scope.save = function () {
                $scope.processing = 1;
                $http.post('/api/courses/lesson/{0}'.replace('{0}', data.lesson.lessonType == 2 ? 'live' : 'record'), {
                    courseId: data.lesson.courseId,
                    lessonName: $scope.lesson.lessonName,
                    lessonSequence: $scope.lesson.lessonSequence,
                    lessonType: data.lesson.lessonType,
                    unitId: data.lesson.unitId,
                }).success(function (data) {
                    if (!data.hasError) {
                        tips.init({ tipsMsg: '添加课节成功' });
                        $uibModalInstance.close();
                    } else {
                        tips.init({tipsMsg: data.message});
                    }
                }).finally(function () {
                    $scope.processing = 0;
                });
            };
        }
    }]);

    app.controller('coursewareDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'data', function ($scope, $http, $uibModalInstance, dialogs, data) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };

        $scope.lesson = data.lesson;
        $http.get('/api/courses/coursewareLibraries', {
            params: {
                courseId: data.lesson.courseId
            }
        }).success(function (data) {
            if (data) {
                $scope.libraries = data;
            }
        }).then(function () {
            if (data.libraryId) {
                $scope.coursewareLibraryId = data.libraryId;
                getCoursewares();
            }
        });

        $scope.libraryChange = function () {
            if ($scope.selectedLibrary) {
                $scope.coursewareLibraryId = $scope.selectedLibrary.libraryId;
                getCoursewares();
            } else {
                $scope.coursewareLibraryId = null;
                $scope.coursewares = null;
            }
        };

        //文本框回车
        $scope.getCourseware = function (e) {
            if (e.keyCode == 13 && $scope.coursewareLibraryId) {
                getCoursewares();
            }
        }

        //查询按钮
        $scope.getCoursewares = function () {
            getCoursewares();
        };
        function getCoursewares() {
            if ($scope.coursewareLibraryId) {
                if ($scope.libraries && $scope.libraries[0]) {
                    var selectedLibrary = $scope.libraries.filter(function (v) {
                        return v.libraryId == $scope.coursewareLibraryId;
                    });
                    if (selectedLibrary && selectedLibrary[0]) {
                        $scope.selectedLibrary = selectedLibrary[0];
                    }
                }
                $http.get('/api/courses/coursewares', {
                    params: {
                        courseId: data.lesson.courseId,
                        libraryId: $scope.coursewareLibraryId,
                        classId: data.lesson.classId,
                    }
                }).success(function (data) {
                    if (data && data.length > 0) {
                        $scope.coursewares = data;
                    } else {
                        $scope.coursewares = null;
                        tips.init({ tipsMsg: '没有找到对应的课件' });
                    }
                });
            }
        }

        $scope.relate = function () {
            var selectedCourseware = $scope.coursewares.filter(function (v) {
                return v.coursewareId == $scope.selectedCoursewareId;
            })[0];
            $uibModalInstance.close(selectedCourseware);
        }

    }]);

    app.controller('syncLessonsDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'data', function ($scope, $http, $uibModalInstance, dialogs, data) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.classes = data.classes;
        
        $scope.save = function () {
            var selectedClasses = $scope.classes.filter(function (v) { return v.isSelected; });
            if (!selectedClasses || selectedClasses.leng <= 0) {
                tips.init({tipsMsg: '请选择需要同步的班级'});
                return;
            }
            $scope.processing = true;
            $http.post('/api/courses/sync/lesson', {
                lessonIds: data.lessonIds,
                courseId: data.courseId,
                classes: selectedClasses,
            }).success(function (data) {
                if (data.hasError) {
                    tips.init({tipsMsg: data.message});
                } else {
                    tips.init({ tipsMsg: '批量同步课节到班级成功' });
                    $uibModalInstance.close();
                }
            }).finally(function () {
                $scope.processing = false;
            });
        }

    }]);

    app.controller('createLessonsDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'data', function ($scope, $http, $uibModalInstance, dialogs, data) {
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.unit = data.unit;

        $http.get('/api/courses/coursewareLibraries', {
            params: {
                courseId: data.unit.courseId,
            }
        }).success(function (data) {
            if (data) {
                $scope.libraries = data;
            }
        });

        $scope.libraryChange = function () {
            if ($scope.selectedLibrary) {
                $scope.coursewareLibraryId = $scope.selectedLibrary.libraryId;
                getCoursewares();
            } else {
                $scope.coursewareLibraryId = null;
                $scope.coursewares = null;
            }
        };

        $scope.getLibrary = function (e) {
            if (e.keyCode == 13 && $scope.coursewareLibraryId) {
                getCoursewares();
            }
        }

        $scope.getCoursewares = function (e) {
            if ($scope.coursewareLibraryId) {
                getCoursewares();
            }
        }

        function getCoursewares() {
            if ($scope.libraries && $scope.libraries[0]) {
                var selectedLibrary = $scope.libraries.filter(function (v) {
                    return v.libraryId == $scope.coursewareLibraryId;
                });
                if (selectedLibrary && selectedLibrary[0]) {
                    $scope.selectedLibrary = selectedLibrary[0];
                }
            }
            $http.get('/api/courses/coursewares', {
                params: {
                    courseId: data.unit.courseId,
                    libraryId: $scope.coursewareLibraryId,
                }
            }).success(function (data) {
                if (data && data.length > 0) {
                    $scope.coursewares = data;
                } else {
                    tips.init({ tipsMsg: '没有找到课件' });
                    $scope.coursewares = null;
                }
            });
        }

        $scope.save = function () {
            var selectedCoursewares = $scope.coursewares.filter(function (v) { return v.isSelected; });
            if (!selectedCoursewares || selectedCoursewares.leng <= 0) {
                tips.init({tipsMsg: '请选择课件'});
                return;
            }
            var maxLessonSeq = 0;
            if (data.unit.lessons && data.unit.lessons.length > 0) {
                maxLessonSeq = data.unit.lessons[data.unit.lessons.length - 1].lessonSequence;
            }
            $scope.processing = 1;
            $http.post('/api/courses/lessons', {
                unitId: data.unit.unitId,
                courseId: data.unit.courseId,
                maxSequence: maxLessonSeq,
                coursewares : selectedCoursewares,
            }).success(function (data) {
                if (!data.hasError) {
                    tips.init({ tipsMsg: '批量添加课节成功' });
                    $uibModalInstance.close();
                } else {
                    tips.init({tipsMsg: data.message});
                }
                
            }).finally(function () {
                $scope.processing = 0;
            });
        };
    }]);

    app.controller('excelDialogController', ['$scope', '$http', '$uibModalInstance', 'dialogs', 'Upload', 'data'
        , function ($scope, $http, $uibModalInstance, dialogs, upload, data) {

        $scope.excel = data.excel;
        $scope.cancel = function () {
            $uibModalInstance.dismiss();
        };
        $scope.upload = function () {
            var file = $scope.file;
            if (file) {
                $scope.processing = 1;
                upload.upload({
                    url: '/api/courses/import?courseId=' + data.course.courseId,
                    data:{
                        file: file,
                    }
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = progressPercentage + '% ' +
                                evt.config.data.file.name;
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({tipsMsg: data.message});
                        $scope.files = null;
                        $scope.log = null;
                    } else {
                        tips.init({ tipsMsg: '导入课程大纲成功' });
                        $uibModalInstance.close();
                    }
                }).then(function () {
                    $scope.processing = 0;
                });
            }
        };
    }]);

    app.controller('courseController', ['$scope', '$http', '$routeParams', 'dialogs', '$rootScope', '$route', '$location', 'platform', '$q', 'Upload', 'cUser'
        , function ($scope, $http, $routeParams, dialogs, $rootScope, $route, $location, platform, $q, upload, cUser) {
        $scope.courseId = $routeParams.courseId;
        
        $scope.homePath = cUser.isPlatformUser ? '/platform' : '/organization';
        if ($rootScope.history.length > 1) {
            $scope.prevPath = $rootScope.history[$rootScope.history.length - 2].path;
        } else {
            $scope.prevPath = cUser.isPlatformUser ? '/platform/courses/all' : '/organization/courses/all';
        }
        switch ($scope.prevPath) {
            case '/platform/courses/all': $scope.prevPathName = '所有课程'; break;
            case '/organization/courses/my': $scope.prevPathName = '我的课程'; break;
            case '/organization/courses/all': $scope.prevPathName = '机构课程'; break;
            default: $scope.prevPathName = cUser.isPlatformUser ? '所有课程' : '机构课程'; break;
        }
        $scope.goBack = function () {
            if ($rootScope.history.length > 1) {
                history.go(-1);
            } else {
                $location.path(cUser.isPlatformUser ? '/platform/courses/all' : '/organization/courses/all');
            }
        };

        $scope.goToClassesPage = function () {
            $location.path('/platform/course/{courseId}/classes'.replace('{courseId}', $scope.courseId)).search('funcType', 6);
        };

        var getCategory = function () {
            var deferred = $q.defer();
            if (!$scope.waiting) {
                deferred.resolve(1);
            } else {
                $http.get('/api/category', {
                    params: {
                        organizationId: $scope.course ? $scope.course.organizationId : null,
                        cateId: 0
                    }
                }).success(function (data) {
                    $scope.tempCate = data.categories;
                    $scope.categories = new Array(5);
                    $scope.c = new Array(5);
                    $scope.categories[1] = $scope.tempCate.filter(function (value, index, array) {
                        return value.depth == 1;
                    });

                    $scope.$watch('c[1]', function (newVal, oldVal) {
                        $scope.categories[2] = null;
                        $scope.categories[3] = null;
                        $scope.categories[4] = null;
                        if (newVal) {
                            $scope.categories[2] = $scope.tempCate.filter(function (value, index, array) {
                                return value.depth == 2 && value.parentId == newVal.cateId;
                            });
                            //if ($scope.categories[2] && $scope.categories[2][0]) {
                            //    $scope.c[2] = $scope.c[2] || $scope.categories[2][0];
                            //}
                        }
                    });

                    $scope.$watch('c[2]', function (newVal, oldVal) {
                        if (newVal) {
                            $scope.categories[3] = $scope.tempCate.filter(function (value, index, array) {
                                return value.depth == 3 && value.parentId == newVal.cateId;
                            });
                            $scope.categories[4] = null;
                            //if ($scope.categories[3] && $scope.categories[3][0]) {
                            //    $scope.c[3] = $scope.c[3] || $scope.categories[3][0];
                            //}
                        }
                    });

                    $scope.$watch('c[3]', function (newVal, oldVal) {
                        if (newVal) {
                            $scope.categories[4] = $scope.tempCate.filter(function (value, index, array) {
                                return value.depth == 4 && value.parentId == newVal.cateId;
                            });
                            //if ($scope.categories[4] && $scope.categories[4][0]) {
                            //    $scope.c[4] = $scope.c[4] || $scope.categories[4][0];
                            //}
                        }
                    });

                    if ($scope.course && $scope.course.categoryId) {
                        var category = $scope.tempCate.filter(function (value, index, array) {
                            return value.cateId == $scope.course.categoryId;
                        })[0];
                        $scope.c[category.depth] = category;
                        var parentId = category.parentId;
                        for (var i = category.depth - 1; i > 0; i--) {
                            var currentCate = $scope.tempCate.filter(function (value, index, array) {
                                return value.cateId == parentId;
                            })[0];
                            parentId = currentCate.parentId;
                            $scope.c[i] = currentCate;
                        }
                    } else {
                        //$scope.c[1] = $scope.categories[1][0];
                    }
                    
                }).finally(function () {
                    $rootScope.$broadcast('dialogs.wait.complete');
                    deferred.resolve(1);
                });
            }
            return deferred.promise;
        };

        var getCourse = function () {
            var deferred = $q.defer();
            if ($scope.courseId) {
                $http.get('/api/courses', {
                    params: {
                        courseId: $scope.courseId
                    }
                }).success(function (data) {
                    if ($scope.waiting) {
                        $rootScope.$broadcast('dialogs.wait.progress', { 'progress': 50 });
                    }
                    if (!data) {
                        location.href = '/platform/course';
                    }
                    $scope.course = data;
                    $scope.units = data.units;
                }).finally(function () {
                    $scope.hasUploadImg = true;
                    deferred.resolve(1);
                });
            }
            else {
                if ($scope.waiting) {
                    $rootScope.$broadcast('dialogs.wait.progress', { 'progress': 50 });
                }
                deferred.resolve(1);
            }
            return deferred.promise;
        };

        var initPic = function () {
            var deferred = $q.defer();
            $http.get('/api/platform/organization/ishjclass', {
                params: {
                    organizationId: $scope.courseId ? $scope.course.organizationId : -1
                }
            }).success(function (data) {
                if ($scope.waiting) {
                    $rootScope.$broadcast('dialogs.wait.progress', { 'progress': 80 });
                }
                $scope.isHjClass = data;
            }).finally(function () {
                deferred.resolve(1);
            });
            return deferred.promise;
        };

        var init = function (waiting) {
            if (waiting) {
                dialogs.wait('数据加载中', '', 30, { keyboard: false, size: 'sm', windowClass: 'dialog-loading' });
            }
            $scope.waiting = waiting || false;
            platform.getCurrentOrg()
                .then(getCourse)
                .then(getCategory)
                .then(initPic);
        };
        init(1);

        function getSelectedCategoryId() {
            var result;
            if ($scope.categories[4] && $scope.categories[4][0] && $('#category4').val()) {
                result = $scope.c[4];
            }
            else if ($scope.categories[3] && $scope.categories[3][0] && $('#category3').val()) {
                result = $scope.c[3];
            }
            else if ($scope.categories[2] && $scope.categories[2][0] && $('#category2').val()) {
                result = $scope.c[2];
            }
            return (result && result.isLeaf) ? result.cateId : null;
        }

        var uploadImg = function () {
            var deferred = $q.defer();
            if ($scope.hasUploadImg) {
                deferred.resolve(1);
            }
            else {
                var file = $scope.file;
                var coverFile = $scope.coverFile;
                var iconFile = $scope.iconFile;

                var hasFile = file,
                    hasCoverFile = coverFile,
                    hasIconFile = iconFile,
                    hasAllFiles = hasFile && hasCoverFile && hasIconFile;


                var uf = [];
                if (hasFile) uf.push(file);
                if (hasCoverFile) uf.push(coverFile);
                if (hasIconFile) uf.push(iconFile);

                if ((!$scope.isHjClass && hasFile) || ($scope.isHjClass && hasAllFiles)) {
                    var body = {
                        url: $scope.isHjClass ? '/api/upload/image/hjclass/multi' : '/api/upload/image/hjcc',
                        data: {
                            files: uf
                        }
                    };
                    upload.upload(body).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = progressPercentage + '% ';
                    }).success(function (data) {
                        $scope.hasUploadImg = true;
                        $scope.images = {
                            bigCoverUrl: data.bigCoverUrl,
                            coverUrl: data.coverUrl,
                            iconUrl: data.iconUrl,
                        }
                        deferred.resolve(data);
                    }).error(function () {
                        deferred.reject('上传图片失败');
                    });
                }
                else {
                    deferred.reject('请选择封面图片');
                } 
            }
            return deferred.promise;
        };

        var uploadImgInEditing = function (file, type) {
            var deferred = $q.defer();
            if ($scope.hasUploadImg) {
                deferred.resolve(1);
            }
            else {
                var hasFile = file;
                if (hasFile) {
                    var body = {
                        url: $scope.isHjClass ? '/api/upload/image/hjclass' : '/api/upload/image/hjcc',
                        data: {
                            file: file,
                        }
                    };
                    upload.upload(body).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = progressPercentage + '% ';
                    }).success(function (data) {
                        $scope.hasUploadImg = true;
                        if (!$scope.images) {
                            $scope.images = {};
                        }
                        if ($scope.isHjClass) {
                            switch (type) {
                                case 'big':
                                    $scope.images.bigCoverUrl = data;
                                    break;
                                case 'cover':
                                    $scope.images.coverUrl = data;
                                    break;
                                case 'icon':
                                    $scope.images.iconUrl = data;
                                    break;
                            }
                        } else {
                            $scope.images = {
                                bigCoverUrl: data.bigCoverUrl,
                                coverUrl: data.coverUrl,
                                iconUrl: data.iconUrl,
                            };
                        }
                        
                        deferred.resolve(data);
                    }).error(function () {
                        $log.warn(data);
                        deferred.reject('导入失败');
                    });
                }
                else {
                    deferred.resolve(1);
                }
            }

            return deferred.promise;
        };

        $scope.fileSelected = function (files, type) {
            switch (type) {
                case 1: $scope.file = files[files.length - 1]; break;
                case 2: $scope.coverFile = files[files.length - 1]; break;
                case 3: $scope.iconFile = files[files.length - 1]; break;
            }
        };


        //create course
        $scope.createCourse = function () {
            $scope.course = $scope.course || {};
            $scope.processing = 1;
            uploadImg().then(function (data) {
                $http.post('/api/courses', {
                    cateId: getSelectedCategoryId(),
                    courseName: $scope.course.courseName,
                    bigCoverUrl: $scope.images.bigCoverUrl,
                    coverUrl: $scope.images.coverUrl,
                    iconUrl: $scope.images.iconUrl,
                }).success(function (data) {
                    if (!data.hasError) {
                        $location.path('/platform/course/{courseId}'.replace('{courseId}', data.data.courseId))
                    } else {
                        tips.init({ tipsMsg: data.message });
                    }
                }).error(function (data, status) {
                }).finally(function () {
                    $scope.processing = 0;
                });
            }, function (data) {
                tips.init({ tipsMsg: data });
                $scope.processing = 0;
            });
            
        };

        //update course
        $scope.updateCourse = function () {
            $scope.processing = 1;
            $q.all([uploadImgInEditing($scope.file, 'big')
                , uploadImgInEditing($scope.coverFile, 'cover')
                , uploadImgInEditing($scope.iconFile, 'icon')])
                .then(function (data) {
                    $http.put('/api/courses', {
                        courseId: $scope.courseId,
                        cateId: getSelectedCategoryId(),
                        courseName: $scope.course.courseName,
                        bigCoverUrl: ($scope.images && $scope.images.bigCoverUrl) ? $scope.images.bigCoverUrl : $scope.course.template.bigCoverUrl,
                        coverUrl: ($scope.images && $scope.images.coverUrl) ? $scope.images.coverUrl : $scope.course.template.coverUrl,
                        iconUrl: ($scope.images && $scope.images.iconUrl) ? $scope.images.iconUrl : $scope.course.template.iconUrl,
                    }).success(function (data) {
                        if (!data.hasError) {
                            tips.init({ tipsMsg: '更新课程信息成功' });
                            init();
                        } else {
                            tips.init({ tipsMsg: data.message });
                        }
                    }).error(function (data, status) {
                    }).finally(function () {
                        $scope.processing = 0;
                    });
                });
        };

        $scope.selectAllLessonsChanged = function () {
            for (var i = $scope.course.units.length - 1; i >= 0; i--) {
                var lessons = $scope.course.units[i].lessons;
                if (lessons && lessons[0]) {
                    lessons.forEach(function (item) {
                        item.isSelected = $scope.isSelectAllLessons;
                    });
                }
            }
        };

        $scope.selectLessonChanged = function () {
            var isSelectAll = true;
            for (var i = $scope.course.units.length - 1; i >= 0; i--) {
                var lessons = $scope.course.units[i].lessons;
                if (lessons && lessons[0]) {
                    var selectedLessons = lessons.filter(function (v) {
                        return v.isSelected;
                    });
                    if (lessons.length != selectedLessons.length) {
                        isSelectAll = false;
                        break;
                    }
                }
            }
            $scope.isSelectAllLessons = isSelectAll;
        };


        //add/update studyunit
        $scope.studyunitDialog = function (unit) {
            var data = {};
            if (unit) {
                data = {
                    studyunit: {
                        courseId: $scope.courseId,
                        unitId: unit.unitId,
                        unitName: unit.unitName,
                        unitSequence: unit.unitSequence,
                    }
                };
            }
            else {
                var units = $scope.course.units;
                data = {
                    studyunit: {
                        courseId: $scope.courseId,
                        unitSequence: (units && units[0]) ? units[units.length - 1].unitSequence + 1 : 1,
                    }
                };
            }
            var dlg = dialogs.create('studyunit_dialog', 'studyUnitDialogController', data, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                init();
            }, function () {

            });
        };

        //delete study unit
        $scope.deleteStudyUnit = function (unit) {
            if (unit.lessons && unit.lessons.length > 0) {
                tips.init({tipsMsg: '不能删除有课节的单元，请先删除课节'});
                return;
            }
            
            var dlg = dialogs.create('ok_cancel_dialog', 'okCancelDialogController', {
                title: '确认删除',
                message: '确认要删除单元：{0} 吗？'.replace('{0}', unit.unitName),
            }, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                $http.delete('/api/courses/studyunit', {
                    params: {
                        courseId: unit.courseId,
                        unitId: unit.unitId,
                    }
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({ tipsMsg: data.message });
                    } else {
                        init();
                        tips.init({ tipsMsg: '删除单元成功' });
                    }
                });
            }, function () {

            });
        };

        //add/update lesson
        $scope.lessonDialog = function (unit, lessonType, lesson) {
            var data = {};
            if (lesson) {
                data = {
                    lesson: angular.copy(lesson)
                };
            }
            else {
                var lessons = unit.lessons;
                data = {
                    lesson: {
                        courseId: $scope.courseId,
                        unitId: unit.unitId,
                        lessonType: lessonType,
                        lessonSequence: (lessons && lessons[0]) ? lessons[lessons.length - 1].lessonSequence + 1 : 1,
                    }
                };
            }
            var dlg = dialogs.create('lesson_dialog', 'lessonDialogController', data, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                init();
            }, function () {

            });


        };



        //delete lesson
        $scope.deleteLesson = function (lesson) {
            var dlg = dialogs.create('ok_cancel_dialog', 'okCancelDialogController', {
                title: '确认删除',
                message: '确认要删除课节：{0} 吗？'.replace('{0}', lesson.lessonName),
            }, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                $http.delete('/api/courses/lesson', {
                    params: {
                        courseId: lesson.courseId,
                        lessonId: lesson.lessonId,
                    }
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({ tipsMsg: data.message });
                    } else {
                        tips.init({ tipsMsg: '删除课节成功' });
                        init();
                    }
                });
            }, function () {

            });
        };

        $scope.relateCourseware = function (lesson, unit) {
            var libraryId = 0;
            if (unit && unit.lessons) {
                var lessonsWithCourseware = unit.lessons.filter(function (v) {
                    return v.coursewareId > 0;
                });
                libraryId = (lessonsWithCourseware && lessonsWithCourseware[0]) ? lessonsWithCourseware[0].libraryId : 0;
            } else {
                libraryId = lesson.libraryId;
            }
            
            var data = {
                lesson: lesson,
                libraryId: libraryId,
            }
            var dlg = dialogs.create('courseware_dialog', 'coursewareDialogController', data, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function (courseware) {
                $http.post('/api/courses/relate/courseware', {
                    lessonId: lesson.lessonId,
                    courseId: lesson.courseId,
                    coursewareId: courseware.coursewareId,
                    coursewareName: courseware.coursewareName,
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({tipsMsg: data.message});
                    } else {
                        init();
                        tips.init({ tipsMsg: '关联课件成功' });
                    }
                });
            }, function () {

            });
        };

        $scope.cancelRelation = function (lesson) {
            var data = {
                lesson: lesson
            }
            var dlg = dialogs.create('ok_cancel_dialog', 'okCancelDialogController', {
                title: '确认取消关联',
                message: '确认要取消关联：{lessonName}吗？'.replace('{lessonName}', lesson.lessonName),
            }, { keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                $http.post('/api/courses/relate/cancel', {
                    lessonId: lesson.lessonId,
                    courseId: lesson.courseId,
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({ tipsMsg: data.message });
                    } else {
                        init();
                        tips.init({ tipsMsg: '取消关联课件成功' });
                    }
                });
            }, function () {

            });
        };

        $scope.createLessons = function (unit) {
            var data = {
                unit: unit
            }
            var dlg = dialogs.create('create_lessons_dialog', 'createLessonsDialogController', data, { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                init();
            }, function () {

            });
        };

        $scope.syncLessons = function () {
            var lessonIds = getSelectedLessons();
            if (!lessonIds) {
                return;
            }

            $http.post('/api/courses/classes', {
                courseId: $scope.course.courseId,
                pageNumber: 1,
                pageSize: 99999,
            }).success(function (data) {
                if (data.hasError) {
                    tips.init({ tipsMsg: data.message });
                } else {
                    var dlg = dialogs.create('sync_lessons_dialog', 'syncLessonsDialogController'
                                , {
                                    classes: data.data.classes,
                                    lessonIds: lessonIds,
                                    courseId: $scope.course.courseId,
                                }
                                , { size: 'md', keyboard: true, backdrop: true, windowClass: 'my-class' });
                    dlg.result.then(function () {
                        init();
                    }, function () {

                    });
                }
            });


            
        };

        $scope.importByExcel = function () {
            var dlg = dialogs.create('excel_dialog', 'excelDialogController'
                , {
                    course: $scope.course,
                    excel: {
                        url: 'http://f1.c.hjfile.cn/public/upload/201507/dbc67d05-a284-4f32-b15c-582c9ab556d4.xlsx',
                        name: '课程大纲模板',
                        title: '导入课程大纲',
                        fileMemo:'请选择课程大纲模板文件',
                    }
                }, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                init();
            }, function () {

            });
        };

        $scope.deleteSelectedLesson = function () {
            var lessonIds = getSelectedLessons();
            if (!lessonIds) {
                return;
            }
            
            var dlg = dialogs.create('ok_cancel_dialog', 'okCancelDialogController', {
                title: '确认删除',
                message: '确认要删除所选的课节吗？',
            }, { size: 'sm', keyboard: true, backdrop: true, windowClass: 'my-class' });
            dlg.result.then(function () {
                $http.delete('/api/courses/lessons', {
                    params: {
                        courseId: $scope.course.courseId,
                        lessonIds: lessonIds,
                    }
                }).success(function (data) {
                    if (data.hasError) {
                        tips.init({ tipsMsg: data.message });
                    } else {
                        init();
                        tips.init({ tipsMsg: '批量删除课节成功' });
                    }
                });
            }, function () {

            });
        };

        function getSelectedLessons() {
            if (!$scope.course || !$scope.course.units || $scope.course.units.length <= 0) {
                return null;
            }
            var selectedLessonIds = [];
            for (var i = $scope.course.units.length - 1; i >= 0; i--) {
                var lessons = $scope.course.units[i].lessons;
                if (lessons && lessons.length > 0) {
                    lessons.forEach(function (item) {
                        if (item.isSelected) {
                            selectedLessonIds.push(item.lessonId);
                        }
                    });
                }
            }
            if (selectedLessonIds.length == 0) {
                tips.init({tipsMsg: '请选择需要操作的课节'});
                return null;
            }
            return selectedLessonIds;
        }
    }]);
})();